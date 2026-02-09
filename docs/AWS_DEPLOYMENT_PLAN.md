# AWS Frontend Deployment – Implementation Plan

This document describes how to deploy **social-platform-frontend** (Next.js 14) to AWS. The backend is already on AWS; this plan focuses on hosting the frontend and connecting it to that backend.

---

## 1. Prerequisites

- [ ] AWS account with appropriate permissions
- [ ] Backend base URL (e.g. API Gateway, ALB, or custom domain)
- [ ] Repository connected to GitHub (or another Git provider supported by Amplify)
- [ ] (Optional) Domain name for the frontend

---

## 2. Recommended Approach: AWS Amplify Hosting

**Why Amplify**

- Native support for Next.js 14 (SSR, SSG, App Router)
- Built-in CI/CD from your Git repo
- Environment variables and secrets in the console
- HTTPS and custom domains out of the box
- Same AWS account as your backend (easy networking/security)

---

## 3. Implementation Steps

### Phase 1: Prepare the Project

| Step | Task                     | Details                                                                                                                                                          |
| ---- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.1  | **Backend URL**          | Confirm the backend base URL (e.g. `https://api.yourdomain.com` or API Gateway invoke URL).                                                                      |
| 1.2  | **Environment variable** | The app uses `NEXT_PUBLIC_API_URL` in `lib/api/client.ts`. You will set this in Amplify (see Phase 2).                                                           |
| 1.3  | **CORS**                 | Ensure the backend allows the Amplify app URL (and your custom domain) in CORS. After the first deploy you’ll get a URL like `https://main.xxxx.amplifyapp.com`. |
| 1.4  | **Build**                | Run `yarn build` locally and fix any build errors before connecting to Amplify.                                                                                  |

### Phase 2: Create Amplify App and First Deploy

| Step | Task                      | Details                                                                                                                                                                                                                          |
| ---- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2.1  | **Create Amplify app**    | In AWS Console: **Amplify** → **New app** → **Host web app** → Connect your Git provider and select `social-platform-frontend` repo and branch (e.g. `main` or `develop`).                                                       |
| 2.2  | **Build settings**        | Amplify usually auto-detects Next.js. If not, use: **Build image**: Amplify Managed (default). **Build spec** (see Section 5 below) – build command: `yarn build` or `npm run build`, output: `.next` (Amplify handles Next.js). |
| 2.3  | **Environment variables** | In Amplify: **App settings** → **Environment variables**. Add: `NEXT_PUBLIC_API_URL` = your backend base URL (e.g. `https://your-api.execute-api.region.amazonaws.com` or custom domain).                                        |
| 2.4  | **First deploy**          | Save and deploy. Amplify will clone, install, build, and host. Note the app URL (e.g. `https://main.xxxx.amplifyapp.com`).                                                                                                       |
| 2.5  | **Update backend CORS**   | Add this Amplify URL (and later your custom domain) to the backend CORS allowed origins.                                                                                                                                         |

### Phase 3: Custom Domain and HTTPS (Optional)

| Step | Task           | Details                                                                                     |
| ---- | -------------- | ------------------------------------------------------------------------------------------- |
| 3.1  | **Add domain** | In Amplify: **Hosting** → **Custom domains** → add your domain (e.g. `app.yourdomain.com`). |
| 3.2  | **DNS**        | Use the CNAME or A/ALIAS record Amplify provides and point your domain to the Amplify app.  |
| 3.3  | **SSL**        | Amplify provisions and renews the certificate automatically.                                |

### Phase 4: CI/CD and Branch Strategy

| Step | Task               | Details                                                                                                                                                                              |
| ---- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 4.1  | **Branches**       | You can connect multiple branches (e.g. `develop` → preview URL, `main` → production).                                                                                               |
| 4.2  | **Build triggers** | Each push to the connected branch triggers a new build and deploy.                                                                                                                   |
| 4.3  | **GitHub Actions** | Your existing `.github/workflows/ci.yml` can stay for lint/test; Amplify will own build + deploy, or you can use Actions to trigger Amplify (e.g. via AWS CLI or Amplify’s webhook). |

### Phase 5: Verification and Rollback

| Step | Task           | Details                                                                                                                             |
| ---- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 5.1  | **Smoke test** | Open the Amplify URL, log in, open a protected route, and confirm API calls go to the backend (network tab: `NEXT_PUBLIC_API_URL`). |
| 5.2  | **Rollback**   | In Amplify, use **Deployments** → choose a previous successful deployment → **Redeploy this version**.                              |

---

## 4. Alternative: Static Export (S3 + CloudFront)

Use this if you want a **static-only** frontend (no SSR) and lower cost.

| Step | Task               | Details                                                                                                                                                                                                             |
| ---- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 4.1  | **Static export**  | In `next.config.js` add `output: 'export'`. Run `yarn build`; Next.js will output to `out/`. Ensure the app does not rely on server-only features (your current app is mostly client-side, so this is likely fine). |
| 4.2  | **S3 bucket**      | Create an S3 bucket, enable static website hosting, and upload the contents of `out/`.                                                                                                                              |
| 4.3  | **Build-time env** | `NEXT_PUBLIC_API_URL` must be set at build time (e.g. in CI or locally before `yarn build`).                                                                                                                        |
| 4.4  | **CloudFront**     | Create a CloudFront distribution with the S3 bucket as origin, default root object `index.html`, and error pages (403/404) redirect to `index.html` for client-side routing.                                        |
| 4.5  | **HTTPS / domain** | Use ACM certificate and attach the domain to the CloudFront distribution.                                                                                                                                           |
| 4.6  | **CI/CD**          | Use GitHub Actions (or similar) to build, upload to S3, and invalidate CloudFront cache.                                                                                                                            |

Your app uses client-side navigation and `NEXT_PUBLIC_*` for the API; static export is compatible as long as you don’t add server components or API routes that require a Node server.

---

## 5. Amplify Build Specification (reference)

If Amplify does not auto-detect Next.js, use a `amplify.yml` in the repo root:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - yarn install --frozen-lockfile
    build:
      commands:
        - yarn build
  artifacts:
    baseDirectory: .next
    files:
      - "**/*"
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

For **Next.js on Amplify**, the default Gen 2 / managed build usually works without this file; only add or customize if the auto-build fails.

---

## 6. Checklist Summary

- [ ] Backend URL and CORS confirmed
- [ ] Amplify app created and connected to Git
- [ ] `NEXT_PUBLIC_API_URL` set in Amplify environment variables
- [ ] First deploy successful and app URL noted
- [ ] Backend CORS updated with Amplify (and custom) frontend URL(s)
- [ ] (Optional) Custom domain and DNS configured
- [ ] Smoke test: login, protected routes, API calls to backend
- [ ] Rollback procedure understood

---

## 7. Post-Deploy: Environment Matrix

| Environment | Branch (example) | Frontend URL          | `NEXT_PUBLIC_API_URL`        |
| ----------- | ---------------- | --------------------- | ---------------------------- |
| Production  | `main`           | Custom or Amplify URL | Production backend URL       |
| Preview     | `develop`        | Amplify preview URL   | Staging backend URL (if any) |

Use different Amplify apps or branches and set `NEXT_PUBLIC_API_URL` per environment in Amplify console.

---

_Document generated for social-platform-frontend (Next.js 14). Adjust branch names and URLs to match your repo and AWS setup._
