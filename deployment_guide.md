# Probiogel Complete Netlify Deployment Guide

This project is fully configured to be hosted on Netlify using the JAMStack architecture. Since we are using **Decap CMS** (which requires Git access to save content), there are a few security configuration steps (Identity & Git Gateway) that must be done in Netlify.

Follow these steps sequentially:

---

## STEP 1: Push Code to GitHub
Before registering on Netlify, your code must be pushed to GitHub so Netlify can detect it and automatically trigger builds whenever changes are made.

1. Go to [GitHub](https://github.com/) and create a **New Repository** (can be set to *Private* or *Public*). Do not check "Add a README" as this project already has one.
2. Open your terminal (VS Code) inside the `probigel` folder.
3. Run the following Git commands in order:
   ```bash
   git init
   git add .
   git commit -m "Initial commit Probiogel website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```
   *(Make sure to replace the origin URL with your actual GitHub repository URL)*

---

## STEP 2: Connect to Netlify
Once the code is on GitHub, we will tell Netlify to fetch and execute it.

1. Log in to your [Netlify Dashboard](https://app.netlify.com/).
2. Click the **"Add new site"** button and select **"Import an existing project"**.
3. Select **GitHub** and grant authorization if prompted.
4. Search for and select the Probiogel repository you just created.
5. On the **Site settings** page, you don't need to change anything because Netlify will automatically read our `netlify.toml` file (The Build command will automatically be set to `npm run build` and the Publish directory to `_site`).
6. Click **"Deploy site"**. Netlify will take about 1-2 minutes to deploy.

---

## STEP 3: Enable Netlify Identity (For CMS Login)
To allow you (or other admins) to log in to `yoursitename.netlify.app/admin`, we need to enable Netlify's authentication system.

1. In your Netlify Dashboard for the project, click the **Site configuration** (or *Site settings*) menu.
2. In the left sidebar, find and click on **Identity**.
3. Click the **Enable Identity** button.
4. Scroll down to the **Registration preferences** section and change it to **Invite only** (Important: so random visitors cannot register as Admins).

---

## STEP 4: Enable Git Gateway
This is the secret bridge between Decap CMS and your GitHub repository, allowing the CMS to create/edit files without asking for your GitHub password every time.

1. Still in the **Site configuration** menu, scroll down to the **Identity** > **Services** section.
2. Look for the **Git Gateway** section and click the **Enable Git Gateway** button.
3. If an authorization pop-up for GitHub appears, please approve it. (Netlify will automatically generate an access token).

---

## STEP 5: Invite Admin Users
The final step is to create an account and password so you can access the CMS.

1. Go back to the top of the **Identity** menu.
2. Click the **Identity** tab in the top navigation bar.
3. Click the **Invite users** button.
4. Enter your email address and send the invitation.
5. Check your email inbox. There will be an email from Netlify containing an invitation link (*Accept Invite*).
6. **Important:** Click that link. It will take you to your Probiogel website, and a pop-up will appear asking you to create a new password.
7. Once the password is created, you are ready to use the CMS!

---

## 🎉 Finished!
You can now visit `https://[your-site-name].netlify.app/admin/` and log in using the Email and Password you just created.

- Every time you **change/save** data in the CMS, the CMS will automatically "Commit" to your GitHub repository.
- Because Netlify is connected to your GitHub, Netlify will detect those changes and **automatically trigger a rebuild** (Auto Deploy) so the latest content appears on your website.
