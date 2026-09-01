document.documentElement.classList.add("js");

const root = document.documentElement;
const header = document.querySelector("[data-header]");
const progress = document.querySelector(".scroll-progress span");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

document.querySelector("[data-year]").textContent = new Date().getFullYear();

function updateScrollState() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
  progress.style.transform = "scaleX(" + Math.min(1, ratio) + ")";
}

updateScrollState();
window.addEventListener("scroll", updateScrollState, { passive: true });

const revealItems = [...document.querySelectorAll(".reveal")];
if ("IntersectionObserver" in window && !reduceMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (finePointer && !reduceMotion) {
  let auraFrame = 0;
  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 3;

  window.addEventListener(
    "pointermove",
    (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (auraFrame) return;
      auraFrame = window.requestAnimationFrame(() => {
        root.style.setProperty("--mx", pointerX + "px");
        root.style.setProperty("--my", pointerY + "px");
        auraFrame = 0;
      });
    },
    { passive: true },
  );

  document.querySelectorAll(".project-card").forEach((card) => {
    let cardFrame = 0;
    let cardX = 0;
    let cardY = 0;

    card.addEventListener("pointermove", (event) => {
      const box = card.getBoundingClientRect();
      cardX = event.clientX - box.left;
      cardY = event.clientY - box.top;
      if (cardFrame) return;

      cardFrame = window.requestAnimationFrame(() => {
        const normalizedX = cardX / box.width - 0.5;
        const normalizedY = cardY / box.height - 0.5;
        card.style.setProperty("--x", cardX + "px");
        card.style.setProperty("--y", cardY + "px");
        card.style.setProperty("--rx", normalizedY * -2.4 + "deg");
        card.style.setProperty("--ry", normalizedX * 2.8 + "deg");
        cardFrame = 0;
      });
    });

    card.addEventListener("pointerleave", () => {
      if (cardFrame) {
        window.cancelAnimationFrame(cardFrame);
        cardFrame = 0;
      }
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  });

  const tiltTarget = document.querySelector("[data-tilt]");
  tiltTarget?.addEventListener("pointermove", (event) => {
    const box = tiltTarget.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    tiltTarget.style.transform =
      "rotateY(" + (x * 3.5 - 2.2) + "deg) rotateX(" + (y * -3.5 + 1) + "deg)";
  });

  tiltTarget?.addEventListener("pointerleave", () => {
    tiltTarget.style.transform = "rotateY(-2.2deg) rotateX(1deg)";
  });
}
