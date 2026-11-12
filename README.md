# English Portfolio – Livio

My English portfolio for TBZ Zürich, published as a website with GitHub Pages.

## Entries

| # | Entry | File |
|---|---|---|
| 1 | About Me / Summer Updates | [`index.md`](index.md) |
| 2 | Brainstorming – Handover Booklet | [`entries/02-brainstorming.md`](entries/02-brainstorming.md) |
| 3 | Environmental Predictions | [`entries/03-environmental-predictions.md`](entries/03-environmental-predictions.md) |
| 4 | Conditionals 0 and 1 | [`entries/04-conditionals.md`](entries/04-conditionals.md) |

## Still to do

- [ ] Entry 1: add the summer photo as `assets/images/summer-photo.jpg` and change the image path in `index.md`
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

## Add a new entry

1. Create `entries/05-<topic>.md` with this header:

   ```yaml
   ---
   title: Your Title
   entry: 5
   date_assigned: 18 November 2026
   ---
   ```

2. Add a link in `_layouts/default.html` (navigation) and in the table above.
