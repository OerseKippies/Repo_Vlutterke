(() => {
  const config = window.VLUTTERKE || {};

  initAnalytics(config.analytics);
  renderPartners(config);
  initMotion();

  function initAnalytics(analytics) {
    if (!analytics || !analytics.id || analytics.provider === "none") return;

    if (analytics.provider === "goatcounter") {
      window.goatcounter = { path: (p) => location.host + p };
      const s = document.createElement("script");
      s.async = true;
      s.dataset.goatcounter = `https://${analytics.id}.goatcounter.com/count`;
      s.src = "//gc.zgo.at/count.js";
      document.head.appendChild(s);
      return;
    }

    if (analytics.provider === "plausible") {
      const s = document.createElement("script");
      s.defer = true;
      s.dataset.domain = analytics.id;
      s.src = "https://plausible.io/js/script.js";
      document.head.appendChild(s);
    }
  }

  function renderPartners(cfg) {
    const section = document.getElementById("partners");
    const featuredHost = document.getElementById("partners-featured");
    const basicHost = document.getElementById("partners-basic");
    const limitedHost = document.getElementById("partners-limited");
    const invite = document.getElementById("partners-invite");
    if (!section || !featuredHost || !basicHost || !limitedHost) return;

    const partners = Array.isArray(cfg.partners) ? cfg.partners : [];
    const visible = partners.filter((p) => p.status === "live" || p.status === "limited");

    featuredHost.innerHTML = "";
    basicHost.innerHTML = "";
    limitedHost.innerHTML = "";

    const featured = visible.filter((p) => p.status === "live" && p.tier === "featured");
    const basic = visible.filter((p) => p.status === "live" && p.tier === "basic");
    const limited = visible.filter((p) => p.status === "limited");

    featured.forEach((p) => featuredHost.appendChild(buildFeatured(p)));
    basic.forEach((p) => basicHost.appendChild(buildBasic(p)));
    limited.forEach((p) => limitedHost.appendChild(buildLimited(p)));

    featuredHost.hidden = featured.length === 0;
    basicHost.hidden = basic.length === 0;
    limitedHost.hidden = limited.length === 0;

    if (invite) {
      const email = (cfg.partnerEmail || "").trim();
      const mailLink = invite.querySelector("[data-partner-mail]");
      if (mailLink) {
        if (email) {
          mailLink.href = `mailto:${email}?subject=${encodeURIComponent("Buurtpartner 't Vlutterke")}`;
          mailLink.hidden = false;
        } else {
          mailLink.hidden = true;
        }
      }
    }

    // Re-observe new partner nodes for motion
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      observeReveals(section.querySelectorAll(".partner-featured, .partner-basic, .partner-limited"));
    }
  }

  function buildFeatured(p) {
    const article = document.createElement("article");
    article.className = "partner-featured";
    article.dataset.partnerId = p.id;

    const media = p.image
      ? `<div class="partner-featured-media"><img src="${escapeAttr(p.image)}" alt="" loading="lazy" /></div>`
      : "";

    article.innerHTML = `
      ${media}
      <div class="partner-featured-body">
        <p class="partner-badge">Buurtpartner</p>
        <h3>${escapeHtml(p.name)}</h3>
        ${p.tagline ? `<p class="partner-tagline">${escapeHtml(p.tagline)}</p>` : ""}
        ${p.description ? `<p class="partner-desc">${escapeHtml(p.description)}</p>` : ""}
        ${
          p.url
            ? `<a class="btn btn-primary" href="${escapeAttr(p.url)}" target="_blank" rel="noopener noreferrer sponsored">${escapeHtml(p.cta || "Bezoek")}</a>`
            : ""
        }
      </div>
    `;
    return article;
  }

  function buildBasic(p) {
    const article = document.createElement("article");
    article.className = "partner-basic";
    article.dataset.partnerId = p.id;
    article.innerHTML = `
      <h3>${escapeHtml(p.name)}</h3>
      ${p.tagline ? `<p>${escapeHtml(p.tagline)}</p>` : ""}
      ${
        p.url
          ? `<a href="${escapeAttr(p.url)}" target="_blank" rel="noopener noreferrer sponsored">${escapeHtml(p.cta || "Bekijk")}</a>`
          : ""
      }
    `;
    return article;
  }

  function buildLimited(p) {
    const el = document.createElement("li");
    el.className = "partner-limited";
    el.dataset.partnerId = p.id;
    if (p.url) {
      el.innerHTML = `<a href="${escapeAttr(p.url)}" target="_blank" rel="noopener noreferrer sponsored">${escapeHtml(p.name)}</a>`;
    } else {
      el.textContent = p.name;
    }
    return el;
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
