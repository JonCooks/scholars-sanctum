# Scholar's Sanctum 📚

> *aequam servare mentem* — maintain a calm mind

A dark academia productivity app for A-Level students. Built with React.

## Features
- 📅 Circadian-rhythm-based daily planner
- 📚 Past papers: AQA Physics, Edexcel Maths, Further Maths, AQA Philosophy
- 🧠 Forgetting-curve revision planner with AI study plan
- ✎ Notebooks with pages
- 🇪🇸 Spanish flashcards & quiz
- 📊 Results & feedback tracker
- ✦ Inspiration from Kobe, Ronaldo, MJ, Eileen Gu, Neymar, Amy Wang
- 📱 Installable as a home screen app (PWA)

---

## 🚀 Deploy to GitHub Pages (step by step)

### Step 1 — Create a GitHub repo
1. Go to [github.com](https://github.com) and sign in
2. Click **New repository**
3. Name it `scholars-sanctum` (or anything you like)
4. Set it to **Public**
5. Click **Create repository**

### Step 2 — Upload these files
You have two options:

**Option A — GitHub website (easiest):**
1. Open your new repo
2. Click **uploading an existing file**
3. Drag and drop ALL the files/folders from this zip
4. Click **Commit changes**

**Option B — Git terminal:**
```bash
cd scholars-sanctum
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/scholars-sanctum.git
git push -u origin main
```

### Step 3 — Enable GitHub Actions (auto-deploy)
1. In your repo, go to **Settings → Pages**
2. Under **Source**, select **GitHub Actions**
3. The `.github/workflows/deploy.yml` file will handle the rest automatically

### Step 4 — Wait ~2 minutes
GitHub will build and deploy your site. You'll find it at:
```
https://YOUR_USERNAME.github.io/scholars-sanctum/
```

---

## 📱 Add to Home Screen

### iPhone / iPad (Safari):
1. Open your GitHub Pages URL in **Safari**
2. Tap the **Share** button (box with arrow)
3. Scroll down → tap **Add to Home Screen**
4. Tap **Add** — done! ✅

### Android (Chrome):
1. Open your URL in **Chrome**
2. Tap the **⋮ menu** (three dots)
3. Tap **Add to Home screen**
4. Tap **Add** ✅

---

## 🛠 Local development
```bash
npm install
npm start
```
