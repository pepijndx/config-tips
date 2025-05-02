// /script.js
//
// Light-weight partial loader. Fetches HTML snippets once the DOM is ready
// and swaps them into the matching placeholders.
//
// Works on any static host — no build-step required.

document.addEventListener('DOMContentLoaded', () => {
    // map data-include value ➜ partial path
    const PARTIALS = {
        navbar:  '/partials/navbar.html',
        footer:  '/partials/footer.html'
    };

    // Find every element that wants a partial:
    document.querySelectorAll('[data-include]').forEach(async el => {
        const name = el.getAttribute('data-include');
        const url  = PARTIALS[name];

        if (!url) { console.warn(`No partial mapped for "${name}"`); return; }

        try {
            const html = await fetch(url).then(r => r.text());
            el.innerHTML = html;

            // Optional: mark active nav link
            if (name === 'navbar') highlightActiveLink(el);
        } catch (err) {
            console.error(`Failed to load ${url}`, err);
        }
    });
});

/* -------------- helpers -------------- */

function highlightActiveLink(navRoot) {
    const here = window.location.pathname.replace(/\/+$/, '');
    navRoot.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href').replace(/\/+$/, '');
        if (href && here.endsWith(href)) link.classList.add('active');
    });
}
