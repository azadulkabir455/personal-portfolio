import Link from "next/link";
import Button from "@/designUI/elements/Button/Button";

export default function DashboardOverviewPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Posts</h2>
        <Link href="/dashboard/posts/new">
          <Button>New post</Button>
        </Link>
      </div>

      <p className="text-neutral-500">Posts table coming soon.</p>
    </div>
  );
}
