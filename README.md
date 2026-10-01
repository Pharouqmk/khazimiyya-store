# Khazimiyya Herbal Medicine: online store

A static storefront for Khazimiyya Herbal Medicine (Facebook: Magani Daga Khazimiyya). Customers browse products, add them to a cart, and send the order to the shop on WhatsApp.

Built with plain HTML, CSS and JavaScript. No framework, no build step.

## Features
- Product grid with search, category filter, discount badges, quick view and wishlist
- Cart saved in the browser, with an order message (items, total, name, phone, address) sent to WhatsApp
- Responsive layout, light and dark mode, keyboard-friendly, reduced-motion support
- Products and the WhatsApp number live in `products.json`

## Edit products
Use the admin panel above, or edit `products.json` by hand. Each product has `name`, `cat` (category), `desc`, `price` (naira) and `old` (previous price, or `0` for no discount). Change `wa` to the shop's WhatsApp number, with country code and no `+`. The products in this repo are placeholders.

## Run locally
The page loads `products.json`, so use a local server instead of opening the file directly:

    python -m http.server 8000

Then open http://localhost:8000.

## Deploy on GitHub Pages
1. Push this repo to GitHub.
2. Go to Settings > Pages, choose the `main` branch and the root folder, and save.
3. For a custom domain, add it under Settings > Pages and create the DNS records GitHub lists. Add a `CNAME` file containing the domain.

## Admin panel (Decap CMS)
The owner manages the store at `/admin`: add, edit and delete products, upload photos, change prices and the WhatsApp number. Each save is a commit to this repo, and the site updates after it deploys. Only people with write access to the repo can log in with their GitHub account.

Setup (one time), hosting the site on Netlify:
1. Edit `admin/config.yml` and set `repo` to your `username/repo-name`.
2. Create a free Netlify account and import this repo as a new site (no build command, publish directory `/`).
3. On GitHub, create an OAuth app (Settings > Developer settings > OAuth apps). Set the homepage to your Netlify URL and the callback URL to `https://api.netlify.com/auth/done`.
4. In Netlify, open the site's access or authentication settings, add GitHub as the provider, and paste the OAuth app's client ID and secret. Netlify's menu names change, so check its current docs.
5. Open `https://your-site.netlify.app/admin` and log in with GitHub.

To use GitHub Pages instead, you also need to host an OAuth proxy and set `base_url` in `admin/config.yml`. See the Decap CMS docs on backends.

## Limits and roadmap
This is a front end only. Payment and delivery are agreed on WhatsApp, and there is no admin login or order database.

- [ ] Product photos for every item
- [ ] Order records (for example Google Sheets through Apps Script)
- [ ] Online payment (Paystack or Flutterwave)
- [ ] Hausa/English language toggle

## Note on health claims
These are traditional herbal products, not a substitute for medical advice. Do not publish unverified health claims on the site.
