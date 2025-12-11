// js/script.js

// Simple helper to fetch snippet files (local)
function fetchSnippet(path) {
  return fetch(path).then(function (response) {
    if (!response.ok) {
      throw new Error('Failed to load snippet: ' + path);
    }
    return response.text();
  });
}

// Simple DOM helper
function insertHtml(selector, html) {
  const el = document.querySelector(selector);
  if (el) el.innerHTML = html;
}

// Escape single quotes for safe insertion into onclick string
function quoteAndEscapeShortName(shortName) {
  // We'll return a JS string literal with single quotes around it
  // Escape any single quotes inside shortName (unlikely) to avoid breaking the onclick attribute
  const escaped = String(shortName).replace(/'/g, "\\'");
  return "'" + escaped + "'";
}

// The $dc namespace used by snippets
window.$dc = (function () {
  // cache categories for random selection
  let categoriesCache = null;

  function init() {
    // load home view
    loadHome();

    // logo click returns to home
    const logo = document.getElementById('logo');
    if (logo) {
      logo.addEventListener('click', function (e) {
        e.preventDefault();
        loadHome();
      });
    }
  }

  function loadHome() {
    // Load the home snippet, but before inserting it, replace the placeholder
    // {{randomCategoryShortName}} with a quoted random short_name, e.g. 'L'
    // We must not edit the snippet file on disk; do replacement in JS.

    // Ensure categories are loaded
    if (!categoriesCache) {
      categoriesCache = DC_DATA.getCategories();
    }

    fetchSnippet('snippets/home-snippet.html')
      .then(function (html) {
        // pick a random category short_name
        const randomShortName = pickRandomCategoryShortName();
        // prepare quoted & escaped value
        const quoted = quoteAndEscapeShortName(randomShortName);

        // Replace the placeholder exactly as assignment requires
        const replaced = html.replace('{{randomCategoryShortName}}', quoted);

        // Insert into page
        insertHtml('#main-content', replaced);

        // Attach event listeners for any dynamic links that are not inline onclicks
        // (home snippet uses inline onclicks, so no further wiring needed)
      })
      .catch(function (err) {
        insertHtml('#main-content', '<p>Error loading home view.</p>');
        console.error(err);
      });
  }

  function pickRandomCategoryShortName() {
    if (!categoriesCache) categoriesCache = DC_DATA.getCategories();
    if (!categoriesCache || categoriesCache.length === 0) return 'SP';
    const idx = Math.floor(Math.random() * categoriesCache.length);
    return categoriesCache[idx].short_name;
  }

  function loadMenuItems(shortName) {
    // shortName may be passed as a string (e.g., 'L') or as something else.
    // Ensure it's a string and strip quotes if necessary.
    if (typeof shortName !== 'string') {
      // If the inline onclick passed a quoted literal, the browser will pass it as a string.
      // But if something else happens, coerce to string.
      shortName = String(shortName);
    }

    // Get category info and items from local data
    const category = DC_DATA.getCategoryByShortName(shortName) || { name: 'Unknown', short_name: shortName };
    const items = DC_DATA.getMenuItemsForCategory(shortName);

    // Build menu items HTML
    const itemsHtml = items.length === 0
      ? '<li>No items found for this category.</li>'
      : items.map(function (it) {
        return '<li><strong>' + escapeHtml(it.name) + '</strong> - ' + escapeHtml(it.description) + ' <span class="price">' + escapeHtml(it.price) + '</span></li>';
      }).join('');

    // Load the single-category snippet and replace placeholders
    fetchSnippet('snippets/single-category-snippet.html')
      .then(function (html) {
        let out = html.replace('{{categoryName}}', escapeHtml(category.name));
        out = out.replace('{{categoryShortName}}', escapeHtml(category.short_name));
        out = out.replace('{{menuItems}}', itemsHtml);

        insertHtml('#main-content', out);

        // Wire up back to home link
        const back = document.getElementById('back-home');
        if (back) {
          back.addEventListener('click', function (e) {
            e.preventDefault();
            loadHome();
          });
        }
      })
      .catch(function (err) {
        insertHtml('#main-content', '<p>Error loading category view.</p>');
        console.error(err);
      });
  }

  function loadMap() {
    insertHtml('#main-content', '<div class="menu"><h2>Map</h2><p>Map placeholder</p></div>');
  }

  // small helper to escape HTML
  function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Expose public API
  return {
    init: init,
    loadHome: loadHome,
    loadMenuItems: loadMenuItems,
    loadMap: loadMap
  };
})();
