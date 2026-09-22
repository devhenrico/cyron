/* Cyron · Vanilla JavaScript + GSAP. The interface contains illustrative data. */
"use strict";
window.lucide?.createIcons();
const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
function closeMenu() {
  mobileNav.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menu");
  document.body.classList.remove("menu-open");
}
menuButton.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") !== "true";
  mobileNav.hidden = !expanded;
  menuButton.setAttribute("aria-expanded", String(expanded));
  menuButton.setAttribute(
    "aria-label",
    expanded ? "Fechar menu" : "Abrir menu",
  );
  document.body.classList.toggle("menu-open", expanded);
});
mobileNav
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const wasOpen = menuButton.getAttribute("aria-expanded") === "true";
    closeMenu();
    if (wasOpen) menuButton.focus();
  }
});
window.matchMedia("(min-width: 761px)").addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});

// Small, explicit demo states; no customer data is collected or persisted.
const demoPanel = document.querySelector("#demo-panel");
const overviewHTML = demoPanel.innerHTML;
const demoViews = {
  overview: { title: "Visão geral", html: overviewHTML },
  clients: {
    title: "Clientes",
    html: `<div class="app-greeting"><div><span class="app-date">RELACIONAMENTOS EM PRIMEIRO LUGAR</span><h2>Quem faz parte da sua história.</h2><p>Uma amostra da carteira de clientes do escritório.</p></div></div><div class="client-table"><div class="demand-row"><span class="client-icon blue">VL</span><div><b>Vértice Logística</b><small>Simples Nacional · Mariana Almeida</small></div><span class="pill green">Ativo</span></div><div class="demand-row"><span class="client-icon violet">SP</span><div><b>Studio Ponto</b><small>Simples Nacional · Lucas Costa</small></div><span class="pill green">Ativo</span></div><div class="demand-row"><span class="client-icon teal">MC</span><div><b>Mercado Central</b><small>Lucro Presumido · Mariana Almeida</small></div><span class="pill green">Ativo</span></div><div class="demand-row"><span class="client-icon blue">AL</span><div><b>Aurora Livraria</b><small>Simples Nacional · Lucas Costa</small></div><span class="pill blue-pill">Em implantação</span></div></div><p class="demo-view-note">4 de 24 clientes ilustrativos · Informações reunidas para um atendimento mais próximo.</p>`,
  },
  tasks: {
    title: "Demandas",
    html: `<div class="app-greeting"><div><span class="app-date">CADA ENTREGA, UM PRÓXIMO PASSO</span><h2>A rotina em movimento.</h2><p>Uma amostra das demandas e dos responsáveis.</p></div></div><div class="task-board"><div class="task-column"><h3>A fazer <span>01</span></h3><div class="task-ticket"><span>AURORA LIVRARIA</span><h4>Conferir documentos de admissão</h4><small>Lucas Costa · 22 set</small></div></div><div class="task-column"><h3>Em andamento <span>01</span></h3><div class="task-ticket"><span>VÉRTICE LOGÍSTICA</span><h4>Conferência de documentos fiscais</h4><small>Mariana Almeida · Hoje</small><span class="pill amber">Prioridade alta</span></div></div><div class="task-column"><h3>Concluído <span>01</span></h3><div class="task-ticket"><span>MERCADO CENTRAL</span><h4>Apuração do Simples Nacional</h4><small>Mariana Almeida · 21 set</small><span class="pill green">Entregue</span></div></div></div><p class="demo-view-note">Exemplos ilustrativos · Cada pessoa sabe o que precisa acontecer.</p>`,
  },
};
const demoTabs = [...document.querySelectorAll(".app-tab")];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
// Animate quantities once as they enter the viewport. Dates and navigation
// indices remain stable; final values are also present without JavaScript.
const countedElements = new WeakSet();
const activeCounters = new Map();
let countersStarted = false;
const countFormatter = new Intl.NumberFormat("pt-BR");
function formatCount(element, value) {
  return countFormatter
    .format(value)
    .padStart(Number(element.dataset.countPad || 0), "0");
}
function animateCount(element) {
  const target = Number(element.dataset.count);
  if (reducedMotion.matches || !window.gsap) {
    element.textContent = formatCount(element, target);
    return;
  }
  const value = { current: 0 };
  element.textContent = formatCount(element, 0);
  const tween = gsap.to(value, {
    current: target,
    duration: element.closest(".number-card") ? 2.6 : 1.8,
    ease: "power2.out",
    onUpdate: () => {
      if (!element.isConnected) {
        activeCounters.get(element)?.kill();
        activeCounters.delete(element);
        return;
      }
      element.textContent = formatCount(element, Math.round(value.current));
    },
    onComplete: () => {
      element.textContent = formatCount(element, target);
      activeCounters.delete(element);
    },
  });
  activeCounters.set(element, tween);
}
const countObserver =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            countObserver.unobserve(entry.target);
            animateCount(entry.target);
          });
        },
        { threshold: 0.45, rootMargin: "0px 0px -8% 0px" },
      )
    : null;
function observeCounters(root = document) {
  if (!countersStarted) return;
  root.querySelectorAll("[data-count]").forEach((element) => {
    if (countedElements.has(element)) return;
    countedElements.add(element);
    if (reducedMotion.matches || !countObserver || !window.gsap) return;
    element.textContent = formatCount(element, 0);
    countObserver.observe(element);
  });
}
reducedMotion.addEventListener("change", (event) => {
  if (!event.matches) return;
  countObserver?.disconnect();
  activeCounters.forEach((tween) => tween.kill());
  activeCounters.clear();
  document.querySelectorAll("[data-count]").forEach((element) => {
    element.textContent = formatCount(element, Number(element.dataset.count));
  });
});
function setDemoView(view) {
  const data = demoViews[view];
  if (!data) return;
  demoTabs.forEach((button) => {
    const active = button.dataset.view === view;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
    button.tabIndex = active ? 0 : -1;
  });
  demoPanel.innerHTML = data.html;
  demoPanel.setAttribute("aria-labelledby", `tab-${view}`);
  document.querySelector("#breadcrumb").textContent = data.title;
  window.lucide?.createIcons();
  observeCounters(demoPanel);
  if (window.gsap && !reducedMotion.matches)
    gsap.fromTo(
      demoPanel,
      { opacity: 0.4, y: 6 },
      { opacity: 1, y: 0, duration: 0.3, overwrite: true },
    );
  window.ScrollTrigger?.refresh();
}
demoTabs.forEach((button, index) => {
  button.addEventListener("click", () => setDemoView(button.dataset.view));
  button.addEventListener("keydown", (event) => {
    const direction = ["ArrowDown", "ArrowRight"].includes(event.key)
      ? 1
      : ["ArrowUp", "ArrowLeft"].includes(event.key)
        ? -1
        : 0;
    if (!direction && !["Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? demoTabs.length - 1
          : (index + direction + demoTabs.length) % demoTabs.length;
    demoTabs[next].focus();
    setDemoView(demoTabs[next].dataset.view);
  });
});
const tabOrientation = () =>
  document
    .querySelector(".dashboard-tabs")
    .setAttribute(
      "aria-orientation",
      window.innerWidth <= 760 ? "horizontal" : "vertical",
    );
tabOrientation();
window.addEventListener("resize", tabOrientation, { passive: true });

document.querySelectorAll("[data-compare]").forEach((button) =>
  button.addEventListener("click", () => {
    const mode = button.dataset.compare;
    document.querySelectorAll("[data-compare]").forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    ["before", "after"].forEach((name) => {
      document.querySelector(`#compare-${name}`).hidden = name !== mode;
    });
    if (window.gsap && !reducedMotion.matches)
      gsap.fromTo(
        `#compare-${mode}`,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.4, overwrite: true },
      );
  }),
);
document
  .querySelectorAll(".faq-list details")
  .forEach((details) =>
    details.addEventListener("toggle", () => window.ScrollTrigger?.refresh()),
  );

// Keep progress moving continuously; resource readiness sets the remaining
// duration instead of stopping at an artificial 90% checkpoint.
const loader = document.querySelector(".loader");
const progress = { value: 0 };
function renderLoading() {
  const number = document.querySelector(".loader-number");
  const bar = document.querySelector(".loader-track span");
  if (number)
    number.textContent =
      String(Math.round(progress.value)).padStart(2, "0") + "%";
  if (bar) bar.style.width = `${progress.value}%`;
}
const heroImage = new Image();
const imageReady = new Promise((resolve) => {
  heroImage.onload = heroImage.onerror = resolve;
  heroImage.src = "assets/hero-atmosphere.webp";
});
const fontsReady = document.fonts?.ready || Promise.resolve();
const pageReady =
  document.readyState === "complete"
    ? Promise.resolve()
    : new Promise((resolve) =>
        window.addEventListener("load", resolve, { once: true }),
      );
let introStarted = false;
function finishLoading() {
  loader?.remove();
  document.documentElement.classList.remove("loading");
  clearTimeout(window.cyronLoaderFailsafe);
  countersStarted = true;
  observeCounters();
  window.ScrollTrigger?.refresh();
}
function startIntro() {
  if (introStarted) return;
  introStarted = true;
  if (!window.gsap || reducedMotion.matches) {
    finishLoading();
    return;
  }
  const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
  if (loader?.isConnected)
    intro
      .to(
        ".loader-center",
        { y: -20, filter: "blur(8px)", opacity: 0, duration: 0.65 },
        "+=.15",
      )
      .to(
        loader,
        {
          clipPath: "inset(0 0 100% 0 round 0 0 50% 50%)",
          duration: 1.15,
          ease: "power4.inOut",
          onComplete: finishLoading,
        },
        "-=.35",
      );
  else finishLoading();
  intro
    .from(
      ".hero-line",
      {
        y: 48,
        filter: "blur(10px)",
        opacity: 0,
        duration: 1.3,
        stagger: 0.12,
        clearProps: "filter",
      },
      "-=.7",
    )
    .from(
      ".hero-enter",
      { y: 20, opacity: 0, duration: 1, stagger: 0.09 },
      "-=1.05",
    )
    .from(".product-stage", { y: 25, opacity: 0, duration: 1.2 }, "-=.85");
  if (window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    const motionContext = gsap.matchMedia();
    motionContext.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray(".reveal").forEach((element) =>
        gsap.from(element, {
          y: 26,
          opacity: 0,
          filter: "blur(3px)",
          duration: 0.9,
          delay: element.matches(".orchid-card,.number-card,.step")
            ? [...element.parentElement.children].indexOf(element) * 0.07
            : 0,
          ease: "power3.out",
          clearProps: "filter,transform,opacity",
          scrollTrigger: { trigger: element, start: "top 92%", once: true },
        }),
      );
      gsap.from(".chart i", {
        scaleY: 0,
        transformOrigin: "center bottom",
        duration: 1.15,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".dashboard", start: "top 65%", once: true },
      });
      gsap.to(".client-profile", {
        rotate: 0,
        y: -8,
        ease: "none",
        scrollTrigger: {
          trigger: ".feature-wide",
          start: "top 90%",
          end: "bottom 30%",
          scrub: 1,
        },
      });
      gsap.to(".hero-atmosphere", {
        y: 65,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.fromTo(
        ".dashboard",
        {
          scale: () => (window.innerWidth > 760 ? 0.86 : 0.95),
          rotateX: () => (window.innerWidth > 760 ? 7 : 0),
          transformPerspective: 1400,
          transformOrigin: "center top",
        },
        {
          scale: 1,
          rotateX: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".product-stage",
            start: "top 96%",
            end: "top 22%",
            scrub: 1.25,
            invalidateOnRefresh: true,
          },
        },
      );
      gsap.from(".floating-footer", {
        y: 65,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: ".footer-space",
          start: "top 98%",
          end: "top 55%",
          scrub: 1,
        },
      });
    });
    ScrollTrigger.refresh();
  }
}
if (reducedMotion.matches) {
  startIntro();
} else {
  if (window.gsap)
    gsap.to(progress, {
      value: 100,
      duration: 6,
      ease: "none",
      onUpdate: renderLoading,
    });
  Promise.race([
    Promise.allSettled([imageReady, fontsReady, pageReady]),
    new Promise((resolve) => setTimeout(resolve, 5500)),
  ]).then(() => {
    const remaining = Math.max(
      0.4,
      (3200 - (performance.now() - window.cyronIntroStartedAt)) / 1000,
    );
    if (window.gsap)
      gsap.to(progress, {
        value: 100,
        duration: remaining,
        ease: "none",
        overwrite: true,
        onUpdate: renderLoading,
        onComplete: startIntro,
      });
    else setTimeout(startIntro, remaining * 1000);
  });
}

document.querySelectorAll("[data-demo-target]").forEach((link) => {
  link.addEventListener("click", () => {
    setDemoView(link.dataset.demoTarget);
    document
      .querySelector(`#tab-${link.dataset.demoTarget}`)
      .focus({ preventScroll: true });
  });
});

// A small orbit echoes the brand. Native pointers remain on touch devices,
// during keyboard navigation and when reduced motion is requested.
const cursor = document.querySelector(".cyron-cursor");
const cursorMedia = window.matchMedia(
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
);
let cursorFrame = 0;
let pointerX = 0,
  pointerY = 0,
  orbitX = 0,
  orbitY = 0;
let pointerCard = null;
function stopCursor() {
  document.documentElement.classList.remove("custom-cursor");
  cursor.classList.remove(
    "is-visible",
    "is-interactive",
    "is-nav",
    "is-pressed",
  );
  cancelAnimationFrame(cursorFrame);
  cursorFrame = 0;
}
function drawCursor() {
  orbitX += (pointerX - orbitX) * 0.22;
  orbitY += (pointerY - orbitY) * 0.22;
  cursor.style.setProperty("--orbit-x", `${orbitX}px`);
  cursor.style.setProperty("--orbit-y", `${orbitY}px`);
  cursor.style.setProperty("--pointer-x", `${pointerX}px`);
  cursor.style.setProperty("--pointer-y", `${pointerY}px`);
  if (Math.abs(pointerX - orbitX) + Math.abs(pointerY - orbitY) > 0.1)
    cursorFrame = requestAnimationFrame(drawCursor);
  else cursorFrame = 0;
}
document.addEventListener(
  "pointermove",
  (event) => {
    if (!cursorMedia.matches || event.pointerType === "touch") return;
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (!cursor.classList.contains("is-visible")) {
      orbitX = pointerX;
      orbitY = pointerY;
    }
    document.documentElement.classList.add("custom-cursor");
    cursor.classList.add("is-visible");
    cursor.classList.toggle(
      "is-interactive",
      !!event.target.closest('a,button,summary,[role="tab"]'),
    );
    cursor.classList.toggle("is-nav", !!event.target.closest(".nav-cta"));
    if (!cursorFrame) cursorFrame = requestAnimationFrame(drawCursor);
    const card = event.target.closest(
      ".orchid-card,.feature-card,.number-card,.compare-panel,.floating-footer",
    );
    if (card !== pointerCard) {
      pointerCard?.classList.remove("pointer-lit");
      pointerCard = card;
    }
    if (card) {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--spot-x", `${pointerX - rect.left}px`);
      card.style.setProperty("--spot-y", `${pointerY - rect.top}px`);
      card.classList.add("pointer-lit");
    }
  },
  { passive: true },
);
document.addEventListener("pointerdown", () =>
  cursor.classList.add("is-pressed"),
);
document.addEventListener("pointerup", () =>
  cursor.classList.remove("is-pressed"),
);
document.documentElement.addEventListener("pointerleave", stopCursor);
window.addEventListener("blur", stopCursor);
document.addEventListener("keydown", (event) => {
  if (event.key === "Tab") stopCursor();
});
cursorMedia.addEventListener("change", stopCursor);

let scrollTicking = false;
const customScrollbar = document.querySelector(".custom-scrollbar");
const customScrollbarThumb = document.querySelector(".custom-scrollbar-thumb");
const navigationLinks = [
  ...document.querySelectorAll(".desktop-nav a,.mobile-nav a"),
];
const navigationSections = [
  "plataforma",
  "recursos",
  "como-funciona",
  "duvidas",
].map((id) => document.getElementById(id));
let currentNavigationId = null;
function updateScrollProgress() {
  document.documentElement.classList.toggle(
    "has-scrolled",
    window.scrollY > 60,
  );
  const activeSection = navigationSections
    .filter(
      (section) =>
        section.getBoundingClientRect().top <= window.innerHeight * 0.38,
    )
    .at(-1);
  const activeId = activeSection?.id || "";
  if (activeId !== currentNavigationId) {
    currentNavigationId = activeId;
    navigationLinks.forEach((link) => {
      if (link.hash === `#${activeId}`)
        link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const trackHeight = window.innerHeight;
  const contentHeight = document.documentElement.scrollHeight;
  const thumbHeight = Math.max(
    44,
    Math.round(trackHeight * (window.innerHeight / contentHeight)),
  );
  const travel = Math.max(0, trackHeight - thumbHeight);
  const progress = total > 0 ? window.scrollY / total : 0;
  document.querySelector(".scroll-progress").style.width = `${progress * 100}%`;
  customScrollbarThumb.style.height = `${thumbHeight}px`;
  customScrollbarThumb.style.transform = `translateY(${travel * progress}px)`;
  customScrollbar.hidden = total <= 0;
  scrollTicking = false;
}
window.addEventListener(
  "scroll",
  () => {
    if (!scrollTicking) {
      requestAnimationFrame(updateScrollProgress);
      scrollTicking = true;
    }
  },
  { passive: true },
);
window.addEventListener("resize", updateScrollProgress, { passive: true });
updateScrollProgress();
