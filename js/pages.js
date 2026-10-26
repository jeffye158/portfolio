/* =========================================================
   Page-specific rendering. Each block only runs when its
   container exists on the current page.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- Helpers ---------- */
  function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function tagsHTML(tags) {
    return tags.map(function (t) { return '<span class="tag">' + escapeHTML(t) + "</span>"; }).join("");
  }

  function isWIP(p) { return p.status === "in-progress"; }

  function badgeHTML(p) {
    return isWIP(p) ? '<span class="status-badge"><i class="bi bi-hammer"></i> In progress</span>' : "";
  }

  function cardHTML(p, i) {
    return (
      '<div class="col-md-6 col-lg-4 project-item reveal delay-' + (i % 3 + 1) + '" data-category="' + p.category + '">' +
        '<a class="project-card" href="project.html?id=' + encodeURIComponent(p.id) + '">' +
          '<div class="thumb">' + badgeHTML(p) + '<img src="' + p.image + '" alt="' + (isWIP(p) ? "Planned layout of " : "Preview of ") + escapeHTML(p.title) + '" loading="lazy" width="640" height="400"></div>' +
          '<div class="body">' +
            '<div class="mb-2">' + tagsHTML(p.tags.slice(0, 3)) + "</div>" +
            "<h3>" + escapeHTML(p.title) + "</h3>" +
            "<p>" + escapeHTML(p.summary) + "</p>" +
            '<span class="more">View project <i class="bi bi-arrow-right"></i></span>' +
          "</div>" +
        "</a>" +
      "</div>"
    );
  }

  /* ---------- Home: featured projects ---------- */
  const featured = document.getElementById("featuredGrid");
  if (featured) {
    featured.innerHTML = PROJECTS.filter(function (p) { return p.featured; })
      .slice(0, 3).map(cardHTML).join("");
    initReveal(featured);
  }

  const countEl = document.getElementById("projectCount");
  if (countEl) countEl.textContent = PROJECTS.filter(function (p) { return p.status !== "in-progress"; }).length;

  /* ---------- Projects: grid + filters ---------- */
  const grid = document.getElementById("projectGrid");
  const filterBar = document.getElementById("filterBar");
  if (grid && filterBar) {
    grid.innerHTML = PROJECTS.map(cardHTML).join("");
    initReveal(grid);

    // Build one filter button per category that has projects
    const used = Object.keys(CATEGORY_LABELS).filter(function (key) {
      return PROJECTS.some(function (p) { return p.category === key; });
    });
    filterBar.innerHTML =
      '<button class="filter-btn active" data-filter="all" aria-pressed="true">All</button>' +
      used.map(function (key) {
        return '<button class="filter-btn" data-filter="' + key + '" aria-pressed="false">' + CATEGORY_LABELS[key] + "</button>";
      }).join("");

    const status = document.getElementById("filterStatus");

    filterBar.addEventListener("click", function (e) {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      const filter = btn.dataset.filter;

      filterBar.querySelectorAll(".filter-btn").forEach(function (b) {
        const on = b === btn;
        b.classList.toggle("active", on);
        b.setAttribute("aria-pressed", on);
      });

      let shown = 0;
      grid.querySelectorAll(".project-item").forEach(function (item) {
        const match = filter === "all" || item.dataset.category === filter;
        if (match) {
          shown++;
          item.classList.remove("d-none");
          requestAnimationFrame(function () { item.classList.remove("hiding"); });
        } else {
          item.classList.add("hiding");
          setTimeout(function () { if (item.classList.contains("hiding")) item.classList.add("d-none"); }, 300);
        }
      });
      if (status) status.textContent = "Showing " + shown + " of " + PROJECTS.length + " projects";
    });

    if (status) status.textContent = "Showing " + PROJECTS.length + " of " + PROJECTS.length + " projects";
  }

  /* ---------- Project detail (project.html?id=...) ---------- */
  const detail = document.getElementById("projectDetail");
  if (detail) {
    const id = new URLSearchParams(window.location.search).get("id");
    const index = PROJECTS.findIndex(function (p) { return p.id === id; });

    if (index === -1) {
      document.title = "Project not found · Zhefeng Ye";
      detail.innerHTML =
        '<div class="text-center py-5">' +
          '<p class="big-404">404</p>' +
          "<h1>Project not found</h1>" +
          '<p class="text-soft">That project link doesn\'t match anything in my portfolio.</p>' +
          '<a class="btn btn-accent mt-3" href="projects.html">See all projects</a>' +
        "</div>";
    } else {
      const p = PROJECTS[index];
      const next = PROJECTS[(index + 1) % PROJECTS.length];
      document.title = p.title + " · Zhefeng Ye";

      const wip = isWIP(p);
      let buttons = "";
      if (p.planUrl) buttons += '<a class="btn btn-accent btn-sm me-2" href="' + p.planUrl + '" target="_blank" rel="noopener"><i class="bi bi-file-earmark-text me-1"></i> Project plan (PDF)</a>';
      if (p.liveUrl) buttons += '<a class="btn btn-accent btn-sm me-2" href="' + p.liveUrl + '" target="_blank" rel="noopener">Live demo <i class="bi bi-box-arrow-up-right ms-1"></i></a>';
      if (p.repoUrl) buttons += '<a class="btn btn-ghost btn-sm" href="' + p.repoUrl + '" target="_blank" rel="noopener"><i class="bi bi-github me-1"></i> Source code</a>';

      detail.innerHTML =
        '<nav aria-label="breadcrumb"><ol class="breadcrumb">' +
          '<li class="breadcrumb-item"><a href="projects.html">Projects</a></li>' +
          '<li class="breadcrumb-item active" aria-current="page">' + escapeHTML(p.title) + "</li>" +
        "</ol></nav>" +

        '<div class="row align-items-end g-3 mb-4">' +
          '<div class="col-lg-8">' +
            '<p class="section-eyebrow mb-1">' + escapeHTML(p.course) + "</p>" +
            '<h1 class="display-5 mb-2">' + escapeHTML(p.title) + "</h1>" +
            (wip ? '<p class="mb-2">' + badgeHTML(p) + "</p>" : "") +
            "<div>" + tagsHTML(p.tags) + "</div>" +
          "</div>" +
          '<div class="col-lg-4 text-lg-end">' + buttons + "</div>" +
        "</div>" +

        '<div class="detail-shot mb-5 reveal"><img src="' + p.image + '" alt="' + (wip ? "Planned dashboard layout for " : "Screenshot of ") + escapeHTML(p.title) + '" width="1280" height="800"></div>' +

        '<div class="row g-4">' +
          '<div class="col-lg-8">' +
            '<h2 class="h4">Overview</h2>' +
            "<p>" + escapeHTML(p.overview) + "</p>" +
            '<h2 class="h4 mt-4">' + (wip ? "Planned features" : "Key features") + "</h2>" +
            '<ul class="feature-list">' + p.features.map(function (f) { return "<li>" + escapeHTML(f) + "</li>"; }).join("") + "</ul>" +
            '<h2 class="h4 mt-4">' + (wip ? "Progress and next steps" : "Challenges and what I learned") + "</h2>" +
            "<p>" + escapeHTML(p.challenges) + "</p>" +
          "</div>" +
          '<div class="col-lg-4">' +
            '<dl class="info-card">' +
              "<dt>Tech stack</dt><dd>" + p.tags.map(escapeHTML).join(", ") + "</dd>" +
              "<dt>Course</dt><dd>" + escapeHTML(p.course) + "</dd>" +
              "<dt>Role</dt><dd>" + escapeHTML(p.role) + "</dd>" +
              '<dt>Type</dt><dd class="mb-0">' + CATEGORY_LABELS[p.category] + "</dd>" +
            "</dl>" +
          "</div>" +
        "</div>" +

        '<a class="next-link mt-5" href="project.html?id=' + encodeURIComponent(next.id) + '">' +
          '<span><span class="mono text-soft d-block">Next project</span><strong class="display-font fs-5">' + escapeHTML(next.title) + "</strong></span>" +
          '<i class="bi bi-arrow-right fs-4"></i>' +
        "</a>";

      initReveal(detail);
    }
  }

  /* ---------- About: fill skill bars when visible ---------- */
  const bars = document.querySelectorAll(".skill-bar span");
  if (bars.length) {
    const fill = function (el) { el.style.width = el.dataset.level + "%"; };
    if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { fill(entry.target); obs.unobserve(entry.target); }
        });
      }, { threshold: 0.4 });
      bars.forEach(function (b) { obs.observe(b); });
    } else {
      bars.forEach(fill);
    }
  }

  /* ---------- Audio: animate the equalizer while playing ---------- */
  document.querySelectorAll("audio[data-eq]").forEach(function (audio) {
    const eq = document.getElementById(audio.dataset.eq);
    if (!eq) return;
    audio.addEventListener("play", function () { eq.classList.add("playing"); });
    audio.addEventListener("pause", function () { eq.classList.remove("playing"); });
    audio.addEventListener("ended", function () { eq.classList.remove("playing"); });
  });

  /* ---------- Contact form validation ---------- */
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        const firstInvalid = form.querySelector(":invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
      }
      /* To receive real messages, set the form's action to a
         Formspree endpoint and replace this block with fetch(). */
      const name = form.elements.name.value.trim().split(" ")[0];
      document.getElementById("successName").textContent = name;
      form.classList.add("d-none");
      const box = document.getElementById("successBox");
      box.classList.add("show");
      box.focus();
    });

    const again = document.getElementById("sendAnother");
    if (again) {
      again.addEventListener("click", function () {
        form.reset();
        form.classList.remove("was-validated", "d-none");
        document.getElementById("successBox").classList.remove("show");
        form.elements.name.focus();
      });
    }
  }
});
