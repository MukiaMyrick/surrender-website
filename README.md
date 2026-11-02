# SURRENDER

To Become. To Walk in Purpose. To Impact.

Static website for GitHub Pages. Publish the `main` branch from repository root in Settings > Pages.

## Status
The devotionals and page navigation are viewable. Subscriber forms, checkout, course enrollment, and contact delivery are **demonstrations only** and are not connected to live services. Do not collect real customer data until integrations and privacy policies are configured.

## Deployment
1. Create a public repository named `surrender-website` on GitHub.
2. Upload all files and the `assets` folder directly into the repository root (not inside a `surrender-website` subfolder).
3. Settings > Pages > Deploy from a branch > `main` > `/ (root)` > Save.
4. Visit `https://YOUR_USERNAME.github.io/surrender-website/` once deployment completes.

## Weekly devotional publishing and delivery
- Public RSS feed: https://mukiamyrick.github.io/surrender-website/feed.xml
- Weekly target delivery: Mondays at 7:00 AM America/New_York (handles DST).
- The RSS feed currently contains Week 1 as a sample. For each approved newly published devotional, add a fresh `<item>` with a new unique `<guid>`, `<pubDate>`, title, link and short description.
- The mailing list signup is a placeholder. It is not collecting subscribers.
- To send automated weekly email from new RSS items, connect an RSS-to-email provider, embed its confirmed opt-in form, and configure a weekly Monday 7 AM Eastern campaign. MailerLite currently lists RSS campaigns on paid plans. Test signup, unsubscribe, timezone and one real campaign before public launch. Do not add private email addresses, tokens, API keys, or credentials to this public repository.
- Posting a new web page alone does not send email. The feed must be updated and the email campaign active.
