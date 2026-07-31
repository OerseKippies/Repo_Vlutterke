(() => {
  const config = window.VLUTTERKE || {};

  initAnalytics(config.analytics);
  renderNeighbors(config);
  initMotion();

  function initAnalytics(analytics) {
    // GoatCounter staat als vast <script> in index.html (officiële snippet).
    // Hier alleen Plausible of uitzetten via config.
    if (!analytics || analytics.provider === "none") return;

    if (analytics.provider === "plausible" && analytics.id) {
      const s = document.createElement("script");
      s.defer = true;
      s.dataset.domain = analytics.id;
      s.src = "https://plausible.io/js/script.js";
      document.head.appendChild(s);
    }
  }

  function renderNeighbors(cfg) {
    const list = document.getElementById("neighbors-list");
    if (!list) return;

    const items = (Array.isArray(cfg.neighbors) ? cfg.neighbors : []).filter(
      (n) => n.status === "live"
    );

    list.innerHTML = "";

    items.forEach((n) => {
      const li = document.createElement("li");
      li.className = "neighbor-item";
      li.dataset.id = n.id;

      const title = n.url
        ? `<a href="${escapeAttr(n.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(n.name)}</a>`
        : `<span>${escapeHtml(n.name)}</span>`;

      li.innerHTML = `
        <div class="neighbor-name">${title}</div>
        ${n.place ? `<div class="neighbor-place">${escapeHtml(n.place)}</div>` : ""}
        ${n.blurb ? `<div class="neighbor-blurb">${escapeHtml(n.blurb)}</div>` : ""}
      `;
      list.appendChild(li);
    });

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      observeReveals(list.querySelectorAll(".neighbor-item"));
    }
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/'/g, "&#39;");
  }

  function observeReveals(nodes) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    nodes.forEach((el) => {
      el.classList.add("reveal");
      observer.observe(el);
    });
  }

  function initMotion() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const targets = document.querySelectorAll(
      ".story-copy, .story-figure, .timeline li, .today-card, .gallery-grid figure, .today-closing"
    );
    observeReveals(targets);
  }
})();
