/* =========================================================
   Shared behaviour for every page:
   theme toggle, active nav link, scroll reveal, typing effect
   ========================================================= */

(function () {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Theme (saved in localStorage) ---------- */
  function getSavedTheme() {
    try { return localStorage.getItem("theme"); } catch (e) { return null; }
  }
  function saveTheme(value) {
    try { localStorage.setItem("theme", value); } catch (e) { /* storage blocked */ }
  }
  function applyTheme(theme) {
    root.setAttribute("data-bs-theme", theme);
    const icon = document.querySelector("#themeToggle i");
    if (icon) icon.className = theme === "dark" ? "bi bi-sun" : "bi bi-moon-stars";
  }

  const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  applyTheme(getSavedTheme() || preferred);

  document.addEventListener("DOMContentLoaded", function () {
    applyTheme(root.getAttribute("data-bs-theme"));

    const toggle = document.getElementById("themeToggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        const next = root.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
        applyTheme(next);
        saveTheme(next);
      });
    }

    /* ---------- Highlight the current page in the navbar ---------- */
    const page = document.body.dataset.page;
    document.querySelectorAll(".site-nav .nav-link").forEach(function (link) {
      if (link.dataset.page === page) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });

    /* ---------- Footer year ---------- */
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    /* ---------- Typing effect on the hero role line ---------- */
    const typed = document.querySelector(".typed");
    if (typed) {
      const words = JSON.parse(typed.dataset.words);
      if (reduceMotion) {
        typed.textContent = words[0];
      } else {
        let w = 0, c = 0, deleting = false;
        (function tick() {
          const word = words[w];
          c += deleting ? -1 : 1;
          typed.textContent = word.slice(0, c);
          let delay = deleting ? 45 : 90;
          if (!deleting && c === word.length) { deleting = true; delay = 1600; }
          else if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; delay = 300; }
          setTimeout(tick, delay);
        })();
      }
    }

    /* ---------- Reveal sections as they scroll into view ---------- */
    initReveal(document);
  });

  /* Exposed so pages.js can reveal cards it renders later */
  window.initReveal = function (scope) {
    const items = scope.querySelectorAll(".reveal:not(.visible)");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("visible"); });
      return;
    }
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { observer.observe(el); });
  };
})();
