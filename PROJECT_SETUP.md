# Project Setup Guide

Ei doc-e ache: Vercel setup, Firebase setup (Auth + Firestore + Rules + Indexes), project-er data flow (Firestore/Auth/Storage kivabe use hoy), folder structure, ar `.env` file setup.

---

## 1. Vercel Setup (step by step)

Notun branch (jemon `azad`) er jonno alada Vercel project banate:

1. [vercel.com](https://vercel.com) → **Add New Project** → GitHub repo (`personal-portfolio`) import koro.
2. Project Name dao (e.g. `azad-portfolio`), Framework Preset: **Next.js** (auto-detect hobe), Root Directory: `./`.
3. **Deploy** e click koro — eta prothome default branch (`main`) diye deploy hobe, seta thik ache.
4. Deploy hoye gele → **Project Settings → Environments** → **Production** row-e click koro.
5. **Branch Tracking** field-e branch name change kore diye **Save** koro (e.g. `main` → `azad`).
6. Same page-r niche **Environment Variables** section-e shob needed variable add koro (dekho niche Section 5 — env var list). Bulk add korte: "Add Environment Variable" → Key field-e multi-line `.env` format text ekbare paste korle Vercel auto-split kore alada alada variable banay.
7. (Optional, recommended) **Settings → Build and Deployment → Ignored Build Step** e ei script diye rakho, jate onno branch (e.g. `main`) e push hole ei Vercel project accidentally rebuild na kore:
   ```bash
   if [ "$VERCEL_GIT_COMMIT_REF" != "azad" ]; then exit 0; else exit 1; fi
   ```
8. Env vars add korar por **Deployments** tab theke manually ekta **Redeploy** trigger koro (naile notun commit push na deওয়া porjonto purono env diye deploy thakবে).

> Note: repo-te root-e `server.js` ache — eta cPanel/Node hosting-er jonno custom server (main branch-er deploy flow). Vercel eta ignore kore native Next.js build ব্যবহার kore, kono conflict hoy na.

---

## 2. Firebase Setup (step by step)

Notun Firebase project (e.g. azad-er jonno) e ei steps follow koro:

### 2.1 Authentication
1. Firebase Console → project select koro → **Build → Authentication → Get Started**.
2. **Sign-in method** tab → **Email/Password** enable koro.
3. Same tab → **Google** provider o enable koro (app dutoi support kore — dekho `src/firebase/authService.ts`).
4. **Users** tab → **Add user** → admin-er email/password diye ekta user create koro (ei credential `.env.local`-er `ADMIN_EMAIL`/`ADMIN_PASSWORD`-er sathe match korte hobe, seed script + admin login duitor jonnoi lagbe).

### 2.2 Firestore Database
1. Left menu → **Firestore Database → Create database**.
2. Database ID: `(default)`.
3. Location: kache-r region select koro (Bangladesh-er jonno `asia-south1` (Mumbai) recommended).
4. Mode: **Production mode**.

### 2.3 Firestore Rules
**Firestore → Rules** tab e existing content mucheh ei rules paste kore **Publish** koro:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /content/{sectionId} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /posts/{postId} {
      allow read: if resource.data.published == true || request.auth != null;
      allow write: if request.auth != null;
    }

    match /projects/{projectId} {
      allow read: if resource.data.published == true || request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

(Source: repo-r root-e `firestore.rules` file)

### 2.4 Firestore Indexes
**Firestore → Indexes → Composite → Add Index**:

| Collection ID | Fields                                      | Query scope |
|---------------|----------------------------------------------|-------------|
| `posts`       | `published` (Ascending), `createdAt` (Descending) | Collection  |
| `projects`    | `published` (Ascending), `createdAt` (Descending) | Collection  |

(Source: repo-r root-e `firestore.indexes.json`; build hote 5-10 min lagte pare)

### 2.5 Seed Default Content
Rules + Index build hoye gele, local `.env.local` e active config set kore (Section 5 dekho) ei command run koro:
```bash
pnpm seed
```
Eta `scripts/seedContent.ts` run kore — shob section-er default content (`content/*` docs), sample blog posts, sample projects Firestore-e save kore. Script `ADMIN_EMAIL`/`ADMIN_PASSWORD` diye sign-in kore tarpor write kore (tai 2.1-er step 4-ta user age create thakte hobe).

---

## 3. Project Data Flow — Firestore / Auth / Storage kivabe use hoy

### Firestore
- **`content/{sectionId}`** — protyek landing/legal section-er (hero, story, footer, etc.) editable content ekhane thake. `useSectionContent(sectionId, fallback)` hook (`src/customHooks/useSectionContent.ts`) — page load hole Firestore theke doc fetch kore, `fallback` (static default, `src/designUI/utilities/content/*.ts`) er sathe merge kore. **Firestore-e doc thakle seta static default-ke override kore** — tai admin panel diye save korle live site update hoy, kintu code-er default file change korle live site change hoy na jotokkhon na admin form diye re-save kora hoy.
- **`posts/{postId}`**, **`projects/{projectId}`** — blog posts ar featured projects, `useFirestoreCollection(fetcher, fallback)` hook diye load hoy (`src/firebase/blogService.ts`, `src/firebase/projectService.ts`). Public read sudhu `published: true` docs-er jonno; admin panel authenticated hole shob dekhte pare.

### Authentication
- `src/firebase/auth.ts` — Firebase Auth instance + Google provider init.
- `src/firebase/authService.ts` — sign in (email/password ba Google popup), sign out, password reset, auth-state subscribe.
- `src/customHooks/useAdminAuthGuard.ts` — admin panel-er route protect kore: user na thakle `/login`-e redirect, ar 24 ghonta por auto-logout (session expiry, localStorage-e track hoy).
- Login/logout UI: `src/designUI/admin/sections/LoginForm`, `src/customHooks/useAdminLogout.ts`.

### File Storage (Firebase Storage NA — cPanel FTP diye)
- **Firebase Storage use kora hocche na** (billing lagto tai remove kora hoyeche). Er bodole **FTP-based custom storage** (`src/lib/ftp.ts`) — cPanel hosting-er FTP server-e file upload/delete/list hoy.
- `src/lib/uploadFolders.ts` — kon kon folder-e file rakha jay (`hero`, `story`, `journey`, `recent-design`, `case-study`, `project`, `blog`, `footer`, `personal-info`).
- `src/app/api/upload/route.ts` — API route jeta FTP diye upload (POST), list (GET), delete (DELETE) kore.
- `PORTFOLIO_OWNER` env var diye per-owner subfolder toiri hoy (e.g. `portfolio/azad/...` vs `portfolio/fatema/...`), so main ar azad branch-er uploaded file alada thake same FTP account-e.
- `src/designUI/admin/sections/StorageManager` — admin panel-er file-browser UI (uploaded file dekha, delete kora, in-use warning dekhano — `src/lib/checkFileUsage.ts`).

---

## 4. Folder Structure — kon kaj kothay

```
src/
├── app/                        # Next.js routes (App Router)
│   ├── (dashboard)/
│   │   ├── (auth)/login, forgot-password    # admin login pages
│   │   └── admin/blog, global, landing,
│   │             project, storage           # admin panel pages
│   ├── api/upload, deploy-webhook           # server-side API routes
│   └── blog, projects, privacy-policy, ...  # public pages
│
├── firebase/                   # Firebase SDK wrapper — sob Firestore/Auth
│   ├── config.ts                # firebase app init, env var read
│   ├── auth.ts                  # Auth instance + Google provider
│   ├── authService.ts           # sign in/out, password reset
│   ├── firestore.ts             # Firestore instance
│   ├── sectionContent.ts        # content/* docs read/write
│   ├── blogService.ts           # posts CRUD
│   └── projectService.ts        # projects CRUD
│
├── customHooks/                 # React hooks (data fetching, auth guard)
│   ├── useSectionContent.ts     # ekta section-er content load (Firestore + fallback)
│   ├── useFirestoreCollection.ts# posts/projects list load
│   ├── useAdminAuthGuard.ts     # admin route protect + session expiry
│   ├── useAdminLogout.ts        # logout action
│   ├── useSaveStatus.ts         # admin form save-state (saving/saved/error)
│   ├── usePageDataLoading.ts    # page loader spinner state
│   └── pageLoadingRegistry.ts   # pending-load counter (loader kobe hide hobe)
│
├── lib/                         # backend utilities (FTP storage, validation)
│   ├── ftp.ts                    # FTP client, remote path/URL builder
│   ├── uploadClient.ts           # browser-side upload fetch wrapper
│   ├── uploadFolders.ts          # allowed folder list + types
│   ├── uploadValidation.ts       # file size/type validation
│   └── checkFileUsage.ts         # file kono content-e use hocche kina check
│
└── designUI/                    # UI layer (component library + pages)
    ├── sections/                 # public-facing page sections (Hero, Story, Blog, ...)
    │   └── <Section>/
    │       ├── <Section>.tsx     # render/markup
    │       ├── function.ts       # hook — logic/state
    │       └── types.ts          # TS types
    ├── elements/                 # reusable primitives (Button, Text, Icon, formElement/*)
    ├── components/                # small reusable composites (Card, PageLoader, SocialIcon)
    ├── admin/
    │   ├── layout/                # admin shell (Topbar, side nav, scaffold)
    │   ├── sections/              # admin forms/managers (HeroForm, BlogListManager, StorageManager, ...)
    │   └── utilities/content/     # admin-only static data (e.g. landingSections.ts)
    └── utilities/
        ├── content/                # public section-er static DEFAULT content (Firestore fallback)
        ├── fonts/, icons/, styles/ # shared design tokens
```

**3-file atomic pattern**: protyek section/element component-e shadharonoto 3 ta file thake — `Component.tsx` (JSX/markup), `function.ts` (hook — state/logic), `types.ts` (TS interfaces). Eta follow kore new component banale.

---

## 5. Environment Variables (.env) Setup

### File naming convention
- **`.env.local`** — active/currently-used config (git-ignored, `next dev`/`next build` eta read kore).
- **`.env.local.main`** — fatema/main branch-er config-er backup copy (git-ignored, template hisebe rakha).
- **`.env.local.azad`** — azad branch-er config-er backup copy (git-ignored, template hisebe rakha).

Branch switch korle `.env.local` automatically change hoy na (git-ignored file, kono branch-e track hoy na). Switch korar somoy:
```bash
# main branch-e kaj korte
cp .env.local.main .env.local

# azad branch-e kaj korte
cp .env.local.azad .env.local
```

### Required variables
```bash
# Firebase (Firebase Console → Project Settings → General → your web app config)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_DATABASE_URL=      # eita blank thakleo cholbe, Realtime DB use hocche na

# Seed script-er jonno (scripts/seedContent.ts) — Firebase Auth-e already existing user hote hobe
ADMIN_EMAIL=
ADMIN_PASSWORD=

# FTP file storage (cPanel)
FTP_USER=
FTP_HOST=
FTP_PORT=
FTP_PASSWORD=

# Per-branch file storage subfolder + public URL
PORTFOLIO_OWNER=              # e.g. "fatema" ba "azad" — FTP folder path-e use hoy
FILE_PUBLIC_BASE_URL=          # e.g. https://tazad.shop/portfolio
```

### Vercel-e env var set kora
Local `.env.local` file Vercel deploy-e কাজ kore na — Vercel-e **Project Settings → Environments → Production → Environment Variables** e manually (ba bulk-paste kore) same variable gulo add korte hobe (ADMIN_EMAIL/ADMIN_PASSWORD lagbe na, oita sudhu local seed script-er jonno).
