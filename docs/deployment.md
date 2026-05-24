# Deployment

**Author:** [Arun Neupane](https://arunneupane.netlify.app) | [@arundada9000](https://github.com/arundada9000)

![CFC Logo](../assets/logos/cfc-logo.png)

---

This is a static site — no build step required. Deploy anywhere that serves static files.

## Option 1: Netlify (Recommended)

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click **Add new site → Import existing project**
4. Connect your GitHub repo
5. Deploy settings:
   - **Branch:** `master`
   - **Publish directory:** `/` (root)
   - **Build command:** leave empty
6. Click **Deploy site**

## Option 2: GitHub Pages

1. Push to GitHub
2. Go to repo **Settings → Pages**
3. Source: **Deploy from branch**
4. Branch: `master`, folder: `/ (root)`
5. Save

## Option 3: Vercel

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import repo
4. Framework preset: **Other**
5. Deploy

## Custom Domain

Point your domain's DNS to your hosting provider. Both Netlify and Vercel provide free SSL certificates.

## Post-Deployment

- [ ] Enable HTTPS
- [ ] Test all features
- [ ] Run Lighthouse audit
- [ ] Verify dark mode works
- [ ] Test on mobile devices
- [ ] Check localStorage persistence

---

*Deployment guide by [Arun Neupane](https://arunneupane.netlify.app)*
