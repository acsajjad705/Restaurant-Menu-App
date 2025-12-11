# Random Specials — Module 5 Solution

This repository contains a small static site that demonstrates the "Random Specials" assignment:
when the user clicks the **Specials** tile on the home page, the app navigates to a **random category** page.

## How it works

- `snippets/home-snippet.html` contains the placeholder `{{randomCategoryShortName}}` in the Specials tile's onclick.
- `js/script.js` loads the home snippet, picks a random category short_name from `js/data.js`, replaces the placeholder with a quoted short_name (e.g., `'L'`), and inserts the snippet into the page.
- Clicking the Specials tile calls `$dc.loadMenuItems('X')` where `'X'` is the randomly chosen short_name.
- The single category page is rendered using `snippets/single-category-snippet.html`.

## Deploy

1. Put the `module5-solution` folder (or whatever you named it) into your GitHub repository.
2. Enable GitHub Pages for the repository (choose the branch and folder where these files live).
3. Visit the GitHub Pages URL, for example:
   `https://yourGitHubId.github.io/repository-name/module5-solution`

## Notes

- The sample uses local data in `js/data.js` so it works offline and on GitHub Pages without external APIs.
- Do not edit `snippets/home-snippet.html` — the assignment requires the placeholder to be replaced by JavaScript.
