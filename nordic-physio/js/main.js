/* Nordic Physio — shared behaviour (no dependencies) */
(function () {
  "use strict";

  var root = document.documentElement;
  var body = document.body;

  /* ---------- Hero photo slider ---------- */
  document.querySelectorAll("[data-hero-slider]").forEach(function (hero) {
    var slides = Array.prototype.slice.call(hero.querySelectorAll(".hero__slide"));
    var dots = Array.prototype.slice.call(hero.querySelectorAll(".hero__dots button"));
    var prevBtn = hero.querySelector(".hero__arrow--prev");
    var nextBtn = hero.querySelector(".hero__arrow--next");
    if (slides.length < 2) return;

    var current = 0;
    var timer = null;
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach(function (slide, idx) {
        var active = idx === current;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", active ? "false" : "true");
      });
      dots.forEach(function (dot, idx) {
        var active = idx === current;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-selected", active ? "true" : "false");
      });
    }

    function startAuto() {
      if (reducedMotion) return;
      stopAuto();
      timer = window.setInterval(function () { goTo(current + 1); }, 5000);
    }

    function stopAuto() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        goTo(current - 1);
        startAuto();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        goTo(current + 1);
        startAuto();
      });
    }
    dots.forEach(function (dot, idx) {
      dot.addEventListener("click", function () {
        goTo(idx);
        startAuto();
      });
    });

    hero.addEventListener("mouseenter", stopAuto);
    hero.addEventListener("mouseleave", startAuto);
    hero.addEventListener("focusin", stopAuto);
    hero.addEventListener("focusout", startAuto);

    hero.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { goTo(current - 1); startAuto(); }
      if (e.key === "ArrowRight") { goTo(current + 1); startAuto(); }
    });

    var touchStartX = 0;
    hero.addEventListener("touchstart", function (e) {
      if (e.touches[0]) touchStartX = e.touches[0].clientX;
    }, { passive: true });
    hero.addEventListener("touchend", function (e) {
      if (!e.changedTouches[0]) return;
      var dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) {
        goTo(dx > 0 ? current - 1 : current + 1);
        startAuto();
      }
    }, { passive: true });

    goTo(0);
    startAuto();
  });

  /* ---------- Sticky / Transparent Header on scroll ---------- */
  function handleScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    if (window.scrollY > 30) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector(".menu-toggle");
  var menu = document.getElementById("site-menu");
  var backdrop = document.querySelector(".menu-backdrop");

  function setMenu(open) {
    body.classList.toggle("menu-open", open);
    if (toggle) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      setMenu(!body.classList.contains("menu-open"));
    });
    if (backdrop) backdrop.addEventListener("click", function () { setMenu(false); });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && body.classList.contains("menu-open")) {
        setMenu(false);
        toggle.focus();
      }
    });
    window.matchMedia("(min-width: 1101px)").addEventListener("change", function (e) {
      if (e.matches) setMenu(false);
    });
  }

  /* ---------- FAQ accordion (one open at a time) ---------- */
  var faqButtons = document.querySelectorAll(".faq-q");
  faqButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var expanded = btn.getAttribute("aria-expanded") === "true";
      faqButtons.forEach(function (other) {
        other.setAttribute("aria-expanded", "false");
        var panel = document.getElementById(other.getAttribute("aria-controls"));
        if (panel) panel.classList.remove("is-open");
      });
      if (!expanded) {
        btn.setAttribute("aria-expanded", "true");
        var currentPanel = document.getElementById(btn.getAttribute("aria-controls"));
        if (currentPanel) currentPanel.classList.add("is-open");
      }
    });
  });

  /* ---------- Testimonials slider ---------- */
  var wrap = document.querySelector(".t-wrap");
  if (wrap) {
    var track = wrap.querySelector(".t-track");
    var prev = document.querySelector(".t-nav .is-prev");
    var next = document.querySelector(".t-nav .is-next");

    var step = function () {
      var card = track.querySelector(".t-card");
      return card ? card.getBoundingClientRect().width + 17 : track.clientWidth;
    };
    var update = function () {
      var atStart = track.scrollLeft <= 4;
      var atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      wrap.classList.toggle("is-start", atStart);
      wrap.classList.toggle("is-end", atEnd);
      if (prev) prev.disabled = atStart;
      if (next) next.disabled = atEnd;
    };
    if (prev) prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: "smooth" }); });
    if (next) next.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: "smooth" }); });
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------- Video modal ---------- */
  var modal;
  function openVideo(src) {
    if (!modal) {
      modal = document.createElement("div");
      modal.className = "modal";
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      modal.setAttribute("aria-label", "Video");
      modal.innerHTML =
        '<div class="modal__box"><button class="modal__close" type="button" aria-label="Close video">&times;</button><iframe allow="autoplay; fullscreen" allowfullscreen title="Video"></iframe></div>';
      body.appendChild(modal);
      modal.addEventListener("click", function (e) {
        if (e.target === modal || e.target.closest(".modal__close")) closeVideo();
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && modal.classList.contains("is-open")) closeVideo();
      });
    }
    modal.querySelector("iframe").src = src + (src.indexOf("?") > -1 ? "&" : "?") + "autoplay=1";
    modal.classList.add("is-open");
    modal.querySelector(".modal__close").focus();
  }
  function closeVideo() {
    if (modal) {
      modal.classList.remove("is-open");
      modal.querySelector("iframe").src = "";
    }
  }
  document.querySelectorAll(".js-video").forEach(function (el) {
    el.addEventListener("click", function () {
      var src = el.getAttribute("data-video");
      if (src) openVideo(src);
    });
  });

  /* ---------- Gallery Filter & Lightbox ---------- */
  var filterBtns = document.querySelectorAll(".gallery-filter-btn");
  var galleryItems = document.querySelectorAll(".gallery-card");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var category = btn.getAttribute("data-filter");
      filterBtns.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");

      galleryItems.forEach(function (item) {
        if (category === "all" || item.getAttribute("data-category") === category) {
          item.style.display = "";
          setTimeout(function () { item.style.opacity = "1"; item.style.transform = "scale(1)"; }, 10);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.95)";
          setTimeout(function () { item.style.display = "none"; }, 250);
        }
      });
    });
  });

  /* Lightbox for Gallery Photos */
  var lightbox;
  function openLightbox(src, title, caption) {
    if (!lightbox) {
      lightbox = document.createElement("div");
      lightbox.className = "lightbox-modal";
      lightbox.setAttribute("role", "dialog");
      lightbox.setAttribute("aria-modal", "true");
      lightbox.setAttribute("aria-label", "Image Preview");
      lightbox.innerHTML = `
        <div class="lightbox-overlay"></div>
        <div class="lightbox-content">
          <button class="lightbox-close" type="button" aria-label="Close image">&times;</button>
          <div class="lightbox-img-wrap">
            <img class="lightbox-img" src="" alt="">
          </div>
          <div class="lightbox-info">
            <h3 class="lightbox-title"></h3>
            <p class="lightbox-caption"></p>
          </div>
        </div>
      `;
      body.appendChild(lightbox);
      lightbox.querySelector(".lightbox-overlay").addEventListener("click", closeLightbox);
      lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
      });
    }
    lightbox.querySelector(".lightbox-img").src = src;
    lightbox.querySelector(".lightbox-img").alt = title || "Gallery Image";
    lightbox.querySelector(".lightbox-title").textContent = title || "";
    lightbox.querySelector(".lightbox-caption").textContent = caption || "";
    lightbox.classList.add("is-open");
    body.classList.add("lightbox-open");
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove("is-open");
      body.classList.remove("lightbox-open");
    }
  }

  document.querySelectorAll("[data-lightbox]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      var src = el.getAttribute("data-src") || el.querySelector("img")?.src;
      var title = el.getAttribute("data-title") || el.querySelector("h3, h4")?.textContent || "";
      var caption = el.getAttribute("data-caption") || el.querySelector("p")?.textContent || "";
      if (src) openLightbox(src, title, caption);
    });
  });

  /* ---------- Services directory tabs & search ---------- */
  document.querySelectorAll("[data-services-dir]").forEach(function (dir) {
    var tabs = Array.prototype.slice.call(dir.querySelectorAll("[data-service-cat]"));
    var groups = Array.prototype.slice.call(dir.querySelectorAll(".service-dir-group"));
    var searchInput = dir.querySelector("#service-search");
    var emptyState = dir.querySelector(".services-dir__empty");
    var activeCat = "all";

    function applyFilter() {
      var query = searchInput ? searchInput.value.trim().toLowerCase() : "";
      var visibleTotal = 0;

      groups.forEach(function (group) {
        var cat = group.getAttribute("data-category");
        var catMatch = activeCat === "all" || cat === activeCat;
        var items = Array.prototype.slice.call(group.querySelectorAll(".service-dir-item"));
        var groupVisible = 0;

        items.forEach(function (item) {
          var text = item.textContent.toLowerCase();
          var show = catMatch && (!query || text.indexOf(query) !== -1);
          item.classList.toggle("is-hidden", !show);
          if (show) {
            groupVisible += 1;
            visibleTotal += 1;
          }
        });

        group.classList.toggle("is-hidden", groupVisible === 0);
      });

      if (emptyState) {
        emptyState.classList.toggle("is-visible", visibleTotal === 0);
      }
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        activeCat = tab.getAttribute("data-service-cat") || "all";
        tabs.forEach(function (t) {
          var isCurrent = t === tab;
          t.classList.toggle("is-active", isCurrent);
          t.setAttribute("aria-selected", isCurrent ? "true" : "false");
        });
        applyFilter();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", applyFilter);
    }
  });

  /* ---------- Date & Time field: text until focused, then native picker ---------- */
  document.querySelectorAll(".field--datetime").forEach(function (input) {
    input.addEventListener("focus", function () { input.type = "datetime-local"; });
    input.addEventListener("blur", function () { if (!input.value) input.type = "text"; });
  });

  /* ---------- Forms (front-end validation only) ---------- */
  function validateField(field) {
    var value = field.value.trim();
    var msg = "";
    if (field.required && !value) {
      msg = "This field is required.";
    } else if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      msg = "Enter a valid email address.";
    } else if (field.type === "tel" && value && !/^[0-9+()\-\s]{7,}$/.test(value)) {
      msg = "Enter a valid phone number.";
    }
    var holder = field.closest(".field-wrap") || field;
    var err = holder.parentNode.querySelector('.field-error[data-for="' + field.name + '"]');
    if (msg) {
      field.setAttribute("aria-invalid", "true");
      if (!err) {
        err = document.createElement("p");
        err.className = "field-error";
        err.setAttribute("data-for", field.name);
        holder.insertAdjacentElement("afterend", err);
      }
      err.textContent = msg;
    } else {
      field.removeAttribute("aria-invalid");
      if (err) err.remove();
    }
    return !msg;
  }

  document.querySelectorAll("form[data-form]").forEach(function (form) {
    var status = form.querySelector(".form__status");
    var fields = form.querySelectorAll(".field");

    fields.forEach(function (f) {
      f.addEventListener("blur", function () { if (f.value || f.hasAttribute("aria-invalid")) validateField(f); });
      f.addEventListener("input", function () { if (f.hasAttribute("aria-invalid")) validateField(f); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      var firstBad = null;
      fields.forEach(function (f) {
        if (!validateField(f)) { ok = false; if (!firstBad) firstBad = f; }
      });
      if (!ok) {
        if (status) { status.textContent = "Please fix the highlighted fields."; status.classList.remove("is-success"); }
        if (firstBad) firstBad.focus();
        return;
      }
      form.reset();
      if (status) {
        status.textContent = form.getAttribute("data-success") || "Thanks! We'll be in touch shortly.";
        status.classList.add("is-success");
      }
    });
  });
})();
