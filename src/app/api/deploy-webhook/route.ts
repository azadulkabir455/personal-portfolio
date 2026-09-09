import { exec } from "child_process";
import { timingSafeEqual } from "crypto";
import { existsSync } from "fs";
import { mkdir, unlink, writeFile } from "fs/promises";
import { join } from "path";
import { promisify } from "util";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const execAsync = promisify(exec);
const LOCK_PATH = join(process.cwd(), "tmp", ".deploying");

function isValidSecret(provided: string | null, expected: string) {
  if (!provided) return false;

  const providedBuffer = Buffer.from(provided);
  const expectedBuffer = Buffer.from(expected);

  return (
    providedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(providedBuffer, expectedBuffer)
  );
}

async function syncAndRestart() {
  if (existsSync(LOCK_PATH)) {
    console.log("[deploy] a sync is already in progress, skipping");
    return;
  }

  const cwd = process.cwd();
  await mkdir(join(cwd, "tmp"), { recursive: true });
  await writeFile(LOCK_PATH, String(Date.now()));

  try {
    console.log("[deploy] installing dependencies...");
    await execAsync("npm install --include=dev", { cwd });

    console.log("[deploy] restarting app...");
    await execAsync("touch tmp/restart.txt", { cwd });

    console.log("[deploy] done.");
  } finally {
    await unlink(LOCK_PATH).catch(() => {});
  }
}

export async function POST(request: Request) {
  const secret = process.env.DEPLOY_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const provided = request.headers.get("x-deploy-secret");
  if (!isValidSecret(provided, secret)) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  syncAndRestart().catch((error) => console.error("[deploy] failed:", error));

  return NextResponse.json({ message: "Sync started" }, { status: 202 });
}
