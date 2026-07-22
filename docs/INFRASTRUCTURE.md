# Infrastructure

How the live site is wired, how to operate it, and how to fix it when it breaks. Written for future-me, who will have forgotten all of this.

## The pieces and how they connect

| Layer | Provider | Role |
|---|---|---|
| Registrar | **Hover** | Owns the domain `ncxifaras.com`. Nameservers point to Cloudflare. Nothing else runs here anymore. |
| DNS + proxy | **Cloudflare** | Authoritative DNS, CDN, TLS, security. The control plane for everything. |
| Hosting | **Cloudflare Pages** | Builds from GitHub and serves the static site. *Pages is the origin* — there is no separate server. |
| Source | **GitHub** | The repo. Push to `main` → Pages builds & deploys. |
| Email | **Cloudflare Email Routing** | Forwards `info@ncxifaras.com` → real address. Receive-only. |
| Analytics | **GoatCounter** | Cookieless page analytics (script + beacon). |

Mental model: registrar just points nameservers at Cloudflare; Cloudflare does DNS/TLS/CDN/email; Pages does hosting; GitHub is the source. Each seam is separate — web (A/CNAME) and email (MX) are independent, so touching one never breaks the other.

## DNS records (and why each exists)

| Name | Type | Value | Proxy | Purpose |
|---|---|---|---|---|
| `ncxifaras.com` | CNAME | `ncxifaras-com.pages.dev` | Proxied | Apex → Pages (CNAME-flattened, since real CNAMEs can't sit at the apex). |
| `www.ncxifaras.com` | CNAME | `ncxifaras.com` | Proxied | `www` alias; 301-redirected to apex. |
| `ncxifaras.com` | MX | `route1/2/3.mx.cloudflare.net` | DNS only | Inbound mail → Cloudflare Email Routing. MX must never be proxied. |
| `ncxifaras.com` | TXT (SPF) | `v=spf1 include:_spf.mx.cloudflare.net -all` | DNS only | Authorises only CF Routing; `-all` = nobody else sends as us. |
| `_dmarc.ncxifaras.com` | TXT | `v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s;` | DNS only | Rejects spoofed mail claiming to be from the domain. |
| `cf2024-1._domainkey…` | TXT | `v=DKIM1; …` | DNS only | CF Routing DKIM selector. |
| `*._domainkey…` | TXT | `v=DKIM1; p=` | DNS only | Wildcard null-DKIM: invalidates any forged selector we didn't publish. |

Deleted: the old `mail.ncxifaras.com` CNAME → Hover (obsolete once email moved to CF Routing; was also wrongly proxied).

## Deploy flow

1. Push to `main` on GitHub.
2. Cloudflare Pages runs the build (`npm run build`, output `dist/`).
3. On success, the new version goes live at `ncxifaras.com`.
4. Non-`main` branches / PRs get **preview deployments** at a `*.pages.dev` URL.

There is no manual deploy step and no server to SSH into. Rollback = redeploy a previous deployment from the Pages dashboard.

## Email routing

- `info@ncxifaras.com` → forwards to the real address. **Receive-only** — replies are sent from the real address, never as `@ncxifaras.com`.
- Managed in **Cloudflare dashboard → Email → Email Routing** (the forwarding *rule* and the *verified destination* live here, not in DNS).
- If forwarding ever stops: check the rule still exists and the destination still shows **Verified**. A destination can silently un-verify.
- Because we never send as the domain, SPF `-all` + DMARC `p=reject` are safe and don't touch inbound forwarding.

## Security headers & caching

- Live in **`public/_headers`** (Astro copies `public/` to the build root, which is where Pages reads it). Editing it anywhere else does nothing.
- Strict CSP: first-party only + GoatCounter. **When GoatCounter is set up, replace `YOURCODE` (×2)** with the real site code — the code is **`nikxif`**, so both become `nikxif.goatcounter.com`.
- HSTS is 180 days, `includeSubDomains`, **no `preload`**. Don't add `preload` until certain every subdomain is HTTPS-forever — it's hard to undo. Keep HSTS defined only in `_headers`, not also in the CF dashboard.
- `script-src` is strict. If View Transitions / islands / `is:inline` scripts trigger CSP errors, add a hash or nonce — never a blanket `'unsafe-inline'` on scripts.

## Key Cloudflare settings (current, intended state)

- SSL/TLS mode: **Full (Strict)**. Always Use HTTPS: on. Min TLS 1.2, TLS 1.3 on.
- DNSSEC: enabled (DS record placed at Hover).
- Rocket Loader: **off** (default; breaks near-zero-JS Astro and CF's own email-decode script).
- Auto Minify: gone from Cloudflare — minify happens at build.
- Email Address Obfuscation: on by default (Scrape Shield); marginal, left on.

## Analytics (GoatCounter)

- Site: **`nikxif.goatcounter.com`** (dashboard is there). Cookieless, no consent banner needed.
- Loaded by a **production-only** `<Analytics/>` component — no hits in local dev, so don't expect to see yourself locally.
- Must be allowed in the `_headers` CSP (`gc.zgo.at` for the script, `nikxif.goatcounter.com` for the beacon).
- **Undercounts by design:** ad/tracker blockers (including Nick's own LAN AdGuard) block the beacon. Verify on the live site, not on the home network.

## Account security

- 2FA on **both** Cloudflare and GitHub.
- A native Cloudflare password is set (not SSO-only), so a GitHub issue can't cascade into a Cloudflare lockout. Recovery codes in Bitwarden.
- Cloudflare Pages' GitHub app is scoped to **only this repo**.

---

## Troubleshooting runbook

### Site shows 522 / 523
Both mean the edge can't reach the Pages backend — almost always a custom-domain/cert still settling, not a real outage. In order:
1. Check <https://www.cloudflarestatus.com> for an incident (rare).
2. Load the raw `ncxifaras-com.pages.dev` directly. Works → it's the custom-domain/cert layer. Fails too → it's the deployment (check the build).
3. **Pages → project → Custom domains:** status should be **Active**. If "Inactive (Error)"/pending, that's it. Ensure both apex and `www` are listed here (separate from DNS).
4. **Cert unstick:** set the apex DNS record to **DNS-only (grey)** ~15 min, then back to **Proxied (orange)**. Forces the edge cert to (re)provision.
5. Confirm SSL/TLS mode is **Full (Strict)**.
6. If just changed: confirm the apex record is still `CNAME → ncxifaras-com.pages.dev` proxied, and that a new DNSSEC DS record fully propagated at Hover.
*(This exact issue hit during setup and cleared with steps 3–4 + a little time.)*

### `info@` stopped forwarding
- Email → Email Routing: rule present? Destination **Verified**? Send a test email.
- Confirm the three `route*.mx.cloudflare.net` MX records still exist and are **DNS only** (not proxied).

### Site won't update after a push
- Check the Pages **deployment** succeeded (failed build = old version stays live).
- Hard-refresh; HTML is set to revalidate, but the browser/edge may briefly serve cached HTML.

### A resource is blocked in the browser console (CSP)
- The CSP in `public/_headers` is deliberately strict. Add the specific host (or a script hash) for the thing being blocked; don't loosen to `'unsafe-inline'` on scripts.

## Gotchas / do-not-do

- Don't proxy MX records (mail hostnames must be DNS-only).
- Don't put `_headers` anywhere but `public/`.
- Don't add HSTS `preload` yet, and don't set HSTS in two places.
- Don't hand-edit the apex/`www` DNS that Pages manages unless you know why.
- Don't send mail *as* `@ncxifaras.com` without first authorising the sender in SPF + DKIM — current records will reject it.
