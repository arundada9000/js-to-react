# Deployment

**Author:** [Arun Neupane](https://arunneupane.netlify.app) | [@arundada9000](https://github.com/arundada9000)

![CFC Logo](../assets/logos/cfc-logo.png)

**Repository:** [github.com/arundada9000/js-to-react](https://github.com/arundada9000/js-to-react)  
**Live Site:** [pre-mern.vercel.app](https://pre-mern.vercel.app)

---

This is a static site - no build step required. Deploy anywhere that serves static files.

## Option 1: Vercel (Current)

This site is currently deployed on **Vercel** at [pre-mern.vercel.app](https://pre-mern.vercel.app).

1. Push to GitHub:
   ```bash
   git remote add origin https://github.com/arundada9000/js-to-react.git
   git push -u origin master
   ```
2. Go to [vercel.com](https://vercel.com)
3. Click **Add New → Project**
4. Import `arundada9000/js-to-react`
5. Framework preset: **Other**
6. Deploy

## Option 2: Netlify

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click **Add new site → Import existing project**
4. Connect `arundada9000/js-to-react`
5. Deploy settings:
   - **Branch:** `master`
   - **Publish directory:** `/` (root)
   - **Build command:** leave empty
6. Click **Deploy site**

## Option 3: GitHub Pages

1. Push to GitHub
2. Go to repo **Settings → Pages**
3. Source: **Deploy from branch**
4. Branch: `master`, folder: `/ (root)`
5. Save

## Custom Domain

Point your domain's DNS to your hosting provider. Netlify and Vercel both provide free SSL certificates.

## Post-Deployment Checklist

- [ ] Enable HTTPS
- [ ] Test all features
- [ ] Run Lighthouse audit
- [ ] Verify dark mode works
- [ ] Test on mobile devices
- [ ] Check localStorage persistence

---

*Deployment guide by [Arun Neupane](https://arunneupane.netlify.app)*
