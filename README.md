# Horváth-Soós Andrea – honlap

Static website for Horváth-Soós Andrea, built from the "Horváth-Soós Andrea – honlap design" canvas (5th round: red & deep-green brand, blue sub-brand for the finance system). Plain HTML/CSS/JS, no build step.

## Pages

| URL | Page |
| --- | --- |
| `/` | Főoldal |
| `/rolam/` | Bemutatkozás, szakmai út, képzések és tanúsítványok (filterable) |
| `/szolgaltatasok/` | Szolgáltatások |
| `/penzugyi-rendszer/` | Pénzügyi rendszer (separate blue product branding) |
| `/blog/` | Blog (filterable by category) |
| `/kapcsolat/` | Kapcsolat + üzenetküldő űrlap |
| `/en/` | English homepage |

## Structure

- `*/index.html` – each page; layout and colours are inline, as exported from the design.
- `assets/css/site.css` – shared background art, fonts helper (`.serif`), mobile menu, focus styles.
- `assets/js/site.js` – mobile menu, category filters, forms.
- `assets/img/` – photos and background motifs.

All links are relative, so the site works both on `https://<user>.github.io/<repo>/` and on a custom domain.

## Deploying to GitHub Pages

The workflow in `.github/workflows/pages.yml` publishes the repository root on every push to `main`.
In the repository settings, under **Settings → Pages → Build and deployment → Source**, choose **GitHub Actions**.

For a custom domain, add a `CNAME` file containing the domain and set the domain under **Settings → Pages**.

## Forms

GitHub Pages has no server. By default, the contact, finance-system and newsletter forms open the visitor's mail program with the message filled in, addressed to `soos.andrea.ev@gmail.com`.
To receive submissions directly, create a form endpoint (for example on Formspree) and add it to the `<form>` tag:

```html
<form class="js-mail-form" data-endpoint="https://formspree.io/f/XXXXXXX" …>
```

## Still to fill in (placeholders from the design)

- `[ADÓSZÁM]` in the homepage footer, `[TAX NUMBER]` in the English footer
- `[Terméknév]`, `[Induló ár / csomagok – kiegészítendő]` on the finance-system page
- `[Díjazás / csomag – kiegészítendő]` on the services page
- Blog posts: `[DÁTUM]`, `[X] perc`, and the articles themselves (cards currently link to `#`)
- Privacy notice (Adatkezelési tájékoztató) and legal notice (Impresszum) pages (links currently point to `#`)
