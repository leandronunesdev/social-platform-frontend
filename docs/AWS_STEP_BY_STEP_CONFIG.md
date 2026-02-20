# AWS Amplify – Step-by-Step Configuration

This guide walks you through configuring **AWS Amplify** for the social platform frontend, with separate URLs for **main** (production) and **develop** branches.

---

## URL reference

| Branch    | Frontend (app)                          | API                                  |
| --------- | --------------------------------------- | ------------------------------------ |
| **main**  | `https://www.socialmediaplatform.online` | `https://api.socialmediaplatform.online` |
| **develop** | `https://dev.socialmediaplatform.online` | `https://api.dev.socialmediaplatform.online` |

Login pages: `.../login` (e.g. `https://www.socialmediaplatform.online/login`).

---

## Main already on AWS? Add develop only

If **main** is already deployed on Amplify and you only need to add **develop**, do this:

1. **Open your app** in [AWS Amplify Console](https://console.aws.amazon.com/amplify/) and select your frontend app.
2. **Connect the develop branch**
   - Left sidebar: **Hosting** (or **Branch**).
   - Click **Connect branch** (or **Manage branches** → **Connect branch**).
   - Choose branch **`develop`** → **Connect branch**. Wait for the first build.
3. **Set develop environment variables**
   - **App settings** → **Environment variables**.
   - Add or edit variables for the **develop** branch (use the branch selector if shown):
     - `NEXT_PUBLIC_APP_URL` = `https://dev.socialmediaplatform.online`
     - `NEXT_PUBLIC_API_URL` = `https://api.dev.socialmediaplatform.online`
   - Save. Then **Redeploy** the develop branch (Deployments → develop → Redeploy) so the build uses the new values.
4. **Optional – custom domain for develop**
   - **Hosting** → **Custom domains** → **Add domain**.
   - Domain: `dev.socialmediaplatform.online` → associate with branch **develop**.
   - Add the CNAME (or A/ALIAS) record in your DNS as shown by Amplify.
5. **Backend CORS**: ensure `https://api.dev.socialmediaplatform.online` allows origin `https://dev.socialmediaplatform.online` (and the develop Amplify URL until you use the custom domain).
6. **Verify**: open the develop URL → `/login` → log in and check in Network tab that requests go to `https://api.dev.socialmediaplatform.online`.

Full steps (including initial main setup) are below.

---

## Prerequisites

- [ ] AWS account with permissions for Amplify (and Route 53 / ACM if using custom domains)
- [ ] Repository on GitHub (or GitLab/Bitbucket) with `main` and `develop` branches
- [ ] Backend APIs deployed and CORS ready to allow the frontend origins above
- [ ] (Optional) Domain `socialmediaplatform.online` in Route 53 or your DNS provider

---

## Step 1: Sign in to AWS and open Amplify

1. Go to [AWS Console](https://console.aws.amazon.com/) and sign in.
2. Search for **Amplify** in the top search bar and open **AWS Amplify**.
3. Click **New app** → **Host web app**.

---

## Step 2: Connect the repository

1. Choose your Git provider (e.g. **GitHub**).
2. If first time: **Authorize** and follow the prompts to connect AWS to your GitHub.
3. Select the **repository** (e.g. `social-platform-frontend`).
4. Select branch **`main`**.
5. Click **Next**.

---

## Step 3: Configure build for main (first time)

1. **App name**: e.g. `social-platform-frontend` (or leave default).
2. Amplify should detect **Next.js**. If it does not, ensure `amplify.yml` exists in the repo root (it is already there).
3. Expand **Advanced settings**.
4. Under **Environment variables**, add:

   | Name                     | Value                                   |
   | ------------------------ | --------------------------------------- |
   | `NEXT_PUBLIC_APP_URL`    | `https://www.socialmediaplatform.online` |
   | `NEXT_PUBLIC_API_URL`    | `https://api.socialmediaplatform.online` |

5. Click **Next**, review, then **Save and deploy**.

Wait for the first build to finish. Note the default URL (e.g. `https://main.xxxxx.amplifyapp.com`).

---

## Step 4: Add the develop branch

1. In Amplify: open your app.
2. In the left sidebar, click **Hosting** (or **Branch** under the app).
3. Click **Connect branch** (or **Manage branches** → **Connect branch**).
4. Select branch **`develop`**.
5. Click **Connect branch** and let it build.

After the build, you get a second URL (e.g. `https://develop.xxxxx.amplifyapp.com`).

---

## Step 5: Set environment variables per branch

Environment variables in Amplify can be set at **app** level or **branch** level. Use branch-level so main and develop use different URLs.

### For the **main** branch

1. In Amplify app → left menu: **App settings** → **Environment variables**.
2. Ensure you are editing the right place:
   - Either set **Branch** to `main` and add/edit variables for that branch only,  
   - Or add variables at app level and override per branch (see Amplify UI).
3. For **main**, ensure:

   | Name                     | Value                                   |
   | ------------------------ | --------------------------------------- |
   | `NEXT_PUBLIC_APP_URL`    | `https://www.socialmediaplatform.online` |
   | `NEXT_PUBLIC_API_URL`    | `https://api.socialmediaplatform.online` |

### For the **develop** branch

1. In **App settings** → **Environment variables**, switch or add configuration for branch **develop**.
2. Set:

   | Name                     | Value                                           |
   | ------------------------ | ----------------------------------------------- |
   | `NEXT_PUBLIC_APP_URL`    | `https://dev.socialmediaplatform.online`     |
   | `NEXT_PUBLIC_API_URL`    | `https://api.dev.socialmediaplatform.online`     |

3. **Redeploy** the develop branch so the new variables are used (Amplify uses env at build time).

> **Note:** In Amplify, you can assign variables to specific branches when adding/editing them. Use that to keep main and develop values separate.

---

## Step 6: Custom domains (production and dev)

Use this when you want `https://www.socialmediaplatform.online` and `https://dev.socialmediaplatform.online` instead of `*.amplifyapp.com`.

### 6.1 Add domain for main (production)

1. In Amplify app → **Hosting** → **Custom domains** (or **Domain management**).
2. Click **Add domain**.
3. Enter: `www.socialmediaplatform.online` (or your root domain; Amplify may offer both).
4. Follow the wizard: Amplify will suggest or create an ACM certificate (us-east-1).
5. You will get a **CNAME** (or A/ALIAS) target, e.g. `main.xxxxx.amplifyapp.com` or a custom Amplify domain.
6. In your DNS (Route 53 or external):
   - Add a **CNAME** record: `www` → target provided by Amplify.
   - Or use the **A/ALIAS** record Amplify shows if you use Route 53.
7. Associate this domain with the **main** branch when asked.
8. Wait for SSL and DNS to turn green.

### 6.2 Add domain for develop

1. Again **Add domain**.
2. Enter: `dev.socialmediaplatform.online`.
3. Complete certificate and DNS:
   - In DNS, add CNAME: `www.dev` (or the subdomain Amplify shows) → Amplify target.
4. Associate this domain with the **develop** branch.
5. Wait for SSL and DNS to be active.

---

## Step 7: Backend CORS

Ensure your backend allows the frontend origins so the browser does not block requests.

- Production API (`https://api.socialmediaplatform.online`): allow  
  `https://www.socialmediaplatform.online`
- Dev API (`https://api.dev.socialmediaplatform.online`): allow  
  `https://dev.socialmediaplatform.online`

Also allow the default Amplify URLs until you fully switch to custom domains, e.g.:

- `https://main.xxxxx.amplifyapp.com`
- `https://develop.xxxxx.amplifyapp.com`

---

## Step 8: Verify

1. **Main**
   - Open `https://www.socialmediaplatform.online/login` (or the main Amplify URL).
   - Log in and open a protected page.
   - In DevTools → Network, confirm requests go to `https://api.socialmediaplatform.online`.
2. **Develop**
   - Open `https://dev.socialmediaplatform.online/login` (or the develop Amplify URL).
   - Log in and confirm API calls go to `https://api.dev.socialmediaplatform.online`.

---

## Quick checklist

- [ ] Amplify app created and connected to Git
- [ ] **main** branch: `NEXT_PUBLIC_APP_URL` + `NEXT_PUBLIC_API_URL` set (production URLs)
- [ ] **develop** branch: `NEXT_PUBLIC_APP_URL` + `NEXT_PUBLIC_API_URL` set (dev URLs)
- [ ] Both branches build successfully
- [ ] Custom domain for main: `www.socialmediaplatform.online` → main branch
- [ ] Custom domain for develop: `dev.socialmediaplatform.online` → develop branch
- [ ] Backend CORS updated for both frontend origins
- [ ] Login and API calls verified for main and develop

---

## Rollback

In Amplify: **Deployments** → select a previous successful deployment → **Redeploy this version**.

---

For more options (e.g. static export with S3 + CloudFront), see `AWS_DEPLOYMENT_PLAN.md`.
