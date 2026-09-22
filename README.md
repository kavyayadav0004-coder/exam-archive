# Prior (previously Exam Archive)

A searchable, community-uploaded repository of school exam papers, filterable by class, board, subject, and exam type. Built with Next.js 15, TypeScript, Tailwind CSS, and Lucide icons.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

---

## Ship it live for free (5 minutes, no payment)

You need two free accounts: GitHub and Vercel. Neither asks for a credit card on the free tier.

### 1. Push this code to GitHub
```bash
# from inside this folder
git remote add origin https://github.com/<your-username>/exam-archive.git
git branch -M main
git push -u origin main
```
(Create the empty repo first at github.com/new — don't initialize it with a README, or the push will conflict.)

### 2. Deploy on Vercel
1. Go to vercel.com → sign up/sign in with your GitHub account (free "Hobby" plan, no card required).
2. Click "Add New Project" → import the `exam-archive` repo.
3. Leave every setting on default — Vercel auto-detects Next.js.
4. Click Deploy.

In about a minute you'll have a live URL like `https://exam-archive-yourname.vercel.app`. Every time you push to `main`, it redeploys automatically.

### 3. Get a real custom domain (optional, still free-ish)
Vercel lets you attach any domain you own for free — you just have to buy the domain itself (~$10-15/year from Namecheap, Cloudflare, etc). Without a custom domain, the `.vercel.app` URL works fine and costs nothing.

---

## "Put it on my phone like an app" — no app store needed

This app already ships a `manifest.json` and icon set, which makes it an installable PWA. Once it's live at a URL:
- **Android (Chrome):** open the site → menu (⋮) → "Install app" / "Add to Home screen"
- **iPhone (Safari):** open the site → Share icon → "Add to Home Screen"

It'll sit on the home screen with its own icon and open full-screen, no browser chrome. This is the free alternative to an app store listing.

---

## If you actually want it in the Apple App Store or Google Play

Be clear-eyed about the cost, because there's no way around it:
- **Apple App Store:** $99/year, no free tier, ever. You also need a Mac with Xcode to build the iOS wrapper.
- **Google Play Store:** $25 one-time registration fee. No Mac needed; you can wrap the site as an Android app using a tool like [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap) (Trusted Web Activity) or [Capacitor](https://capacitorjs.com/).

If you ever get the $25 for Play Store, that's the cheaper and easier of the two to actually do — come back and I'll walk you through wrapping this exact app with Bubblewrap once it's live at a URL (it needs a live HTTPS URL to point at first).

---

## One thing worth thinking about before this goes public

This is a UGC platform hosting other schools' and teachers' exam papers. A few real risks, not hypothetical ones:
- **Copyright:** exam papers are typically owned by the school/board that wrote them. "Past papers" sharing is common and rarely enforced, but it's not automatically legal just because it's common.
- **Live/upcoming exams:** if anyone uploads a *current* pre-board or unit test before it's been administered everywhere, that's a cheating-enablement problem, not just a copyright one. You might want a rule against uploading anything less than, say, a few weeks old.
- **App store review:** both Apple and Google specifically scrutinize UGC apps for content moderation. You already have a DMCA/report flow built in, which helps, but a real review might ask what your actual moderation process is (not just the report button) before approving a listing.

None of this is a reason not to ship it. It's a reason to have an actual answer ready if someone asks.
