# English Portfolio – Livio

My English portfolio for TBZ Zürich, published as a website with GitHub Pages.

## Entries

| # | Entry | File |
|---|---|---|
| 1 | About Me / Summer Updates | [`index.html`](index.html) |
| 2 | Brainstorming – Handover Booklet | [`entries/02-brainstorming.html`](entries/02-brainstorming.html) |
| 3 | Environmental Predictions | [`entries/03-environmental-predictions.html`](entries/03-environmental-predictions.html) |
| 4 | Conditionals 0 and 1 | [`entries/04-conditionals.html`](entries/04-conditionals.html) |

## Still to do

- [ ] Entry 1: add the summer photo to `assets/images/` and change the image path in `index.html`
- [ ] Entry 1: write the summer highlights
- [ ] Entry 2: add my department
- [ ] Entry 3: adapt the AI water text to my own opinion
- [ ] Search for `TODO` and remove all placeholders

## Publish on GitHub Pages

```bash
cd english_portfolio_TBZ
git init -b main
git add .
git commit -m "Add English portfolio entries 1-4"
git remote add origin https://github.com/84b8cnhdbp-ai/english_portfolio_TBZ.git
git push -u origin main
```

Then on GitHub: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**.
The site is live at `https://84b8cnhdbp-ai.github.io/english_portfolio_TBZ/` after a minute or two.

## Preview locally (optional)

```bash
bundle install
bundle exec jekyll serve
```

Open <http://localhost:4000/english_portfolio_TBZ/>.

## How the site works

- `index.html` – home page (hero, About Me, summer, entry cards)
- `entries/*.html` – one page per entry (layout: `_layouts/entry.html`)
- `_data/entries.yml` – list of all entries (title, colour, icon, summary). Navigation and cards are built from it.
- `_includes/illus/*.svg` – animated illustrations, `_includes/icon.html` – small icons
- `assets/css/style.css` – design, `assets/js/main.js` – animations and interactions

## Add a new entry

1. Create `entries/05-<topic>.html`:

   ```html
   ---
   title: Your Title
   entry: 5
   ---
   <section>
     <h2>Heading</h2>
     <p>Text …</p>
   </section>
   ```

2. Add the entry to `_data/entries.yml` (n, title, short, url, date, color, icon, summary).
