import { useEffect } from "react";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function usePortfolioEffects(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const body = document.body;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];
    body.classList.add("portfolio-effects-mounted");

    const preloader = document.querySelector<HTMLElement>(".portfolio-preloader");
    const hero = document.querySelector<HTMLElement>(".heroAnimation");
    const hidePreloader = window.setTimeout(() => {
      preloader?.classList.add("is-hidden");
      hero?.classList.add("activeAnimation");
    }, reducedMotion ? 40 : 700);
    cleanups.push(() => window.clearTimeout(hidePreloader));

    const revealItems = Array.from(
      document.querySelectorAll<HTMLElement>(
        [
          ".section-header",
          ".tj-service-4-wrapper",
          ".portfolio-project-card",
          ".resume_item",
          ".portfolio-skill-card",
          ".project-detail-copy",
          ".project-detail-visual",
          ".detail-meta-grid article",
          ".detail-story-block",
          ".detail-impact-band article",
          ".detail-gallery figure",
          ".detail-process-list article",
          ".detail-stack-card",
          ".detail-stack-notes article",
          ".detail-related-card",
          ".contact-info-list li",
          ".portfolio-contact .contact-form-box",
          ".portfolio-footer",
        ].join(","),
      ),
    );

    if (reducedMotion) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
    } else {
      revealItems.forEach((item) => item.classList.add("reveal-on-scroll"));
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -4% 0px", threshold: 0.06 },
      );
      revealItems.forEach((item) => revealObserver.observe(item));
      cleanups.push(() => revealObserver.disconnect());
    }

    const counterItems = Array.from(document.querySelectorAll<HTMLElement>("[data-counter-target]"));
    const animateCounter = (item: HTMLElement) => {
      const target = Number(item.dataset.counterTarget ?? "0");
      const duration = reducedMotion ? 1 : 1100;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = clamp((now - start) / duration, 0, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        item.textContent = String(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target as HTMLElement);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );
    counterItems.forEach((item) => counterObserver.observe(item));
    cleanups.push(() => counterObserver.disconnect());

    const progressCards = Array.from(document.querySelectorAll<HTMLElement>(".portfolio-skill-card"));
    const progressObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("skill-visible");
            progressObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.2 },
    );
    progressCards.forEach((card) => progressObserver.observe(card));
    cleanups.push(() => progressObserver.disconnect());

    if (!reducedMotion && window.matchMedia("(pointer: fine)").matches) {
      const tiltItems = Array.from(document.querySelectorAll<HTMLElement>(".tilt-card"));
      tiltItems.forEach((item) => {
        const maxTilt = Number(item.dataset.tiltMax ?? "10");
        const hoverScale = Number(item.dataset.tiltScale ?? "1.02");
        const media = item.querySelector<HTMLElement>(".tj-project-4-thumb img");
        const onMove = (event: PointerEvent | MouseEvent) => {
          const rect = item.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          item.style.setProperty("--tilt-x", `${clamp(-y * maxTilt, -maxTilt, maxTilt)}deg`);
          item.style.setProperty("--tilt-y", `${clamp(x * maxTilt, -maxTilt, maxTilt)}deg`);
          item.style.setProperty("--tilt-glow-x", `${(x + 0.5) * 100}%`);
          item.style.setProperty("--tilt-glow-y", `${(y + 0.5) * 100}%`);
          item.style.setProperty("--tilt-scale", String(hoverScale));
          if (media) {
            media.style.setProperty("--media-x", `${clamp(-x * 18, -14, 14)}px`);
            media.style.setProperty("--media-y", `${clamp(-y * 18, -14, 14)}px`);
            media.style.setProperty("--media-scale", "1.08");
          }
          item.classList.add("is-tilting");
        };
        const onLeave = () => {
          item.style.setProperty("--tilt-x", "0deg");
          item.style.setProperty("--tilt-y", "0deg");
          item.style.setProperty("--tilt-scale", "1");
          media?.style.setProperty("--media-x", "0px");
          media?.style.setProperty("--media-y", "0px");
          media?.style.setProperty("--media-scale", "1");
          item.classList.remove("is-tilting");
        };
        item.addEventListener("pointerenter", onMove);
        item.addEventListener("mouseenter", onMove);
        item.addEventListener("pointermove", onMove);
        item.addEventListener("mousemove", onMove);
        item.addEventListener("pointerleave", onLeave);
        item.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          item.removeEventListener("pointerenter", onMove);
          item.removeEventListener("mouseenter", onMove);
          item.removeEventListener("pointermove", onMove);
          item.removeEventListener("mousemove", onMove);
          item.removeEventListener("pointerleave", onLeave);
          item.removeEventListener("mouseleave", onLeave);
        });
      });
    }

    const progressButton = document.querySelector<HTMLElement>(".progress-wrap");
    const progressPath = document.querySelector<SVGPathElement>(".progress-wrap path");
    const pathLength = progressPath?.getTotalLength() ?? 0;
    let scrollProgressFrame = 0;
    let progressButtonVisible = false;
    if (progressPath && pathLength) {
      progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
      progressPath.style.strokeDashoffset = `${pathLength}`;
    }

    const updateScrollProgress = () => {
      scrollProgressFrame = 0;
      const scrollTop = window.scrollY;
      const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = clamp(scrollTop / scrollable, 0, 1);
      if (progressPath && pathLength) {
        progressPath.style.strokeDashoffset = `${pathLength - progress * pathLength}`;
      }
      const shouldShowProgressButton = scrollTop > 120;
      if (shouldShowProgressButton !== progressButtonVisible) {
        progressButtonVisible = shouldShowProgressButton;
        progressButton?.classList.toggle("active-progress", shouldShowProgressButton);
      }
    };
    const requestScrollProgressUpdate = () => {
      if (scrollProgressFrame) return;
      scrollProgressFrame = requestAnimationFrame(updateScrollProgress);
    };
    const onProgressClick = () => window.scrollTo({ top: 0, behavior: "smooth" });
    updateScrollProgress();
    window.addEventListener("scroll", requestScrollProgressUpdate, { passive: true });
    progressButton?.addEventListener("click", onProgressClick);
    cleanups.push(() => {
      window.removeEventListener("scroll", requestScrollProgressUpdate);
      progressButton?.removeEventListener("click", onProgressClick);
      if (scrollProgressFrame) cancelAnimationFrame(scrollProgressFrame);
    });

    const cursor = document.querySelector<HTMLElement>("#magic-cursor");
    const ball = document.querySelector<HTMLElement>("#ball");
    if (!reducedMotion && cursor && ball && window.matchMedia("(pointer: fine)").matches) {
      let mouseX = window.innerWidth / 2;
      let mouseY = window.innerHeight / 2;
      let cursorX = mouseX;
      let cursorY = mouseY;
      let raf = 0;

      const animateCursor = () => {
        const deltaX = mouseX - cursorX;
        const deltaY = mouseY - cursorY;
        cursorX += deltaX * 0.18;
        cursorY += deltaY * 0.18;
        ball.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
        if (Math.abs(deltaX) > 0.18 || Math.abs(deltaY) > 0.18) {
          raf = requestAnimationFrame(animateCursor);
        } else {
          raf = 0;
        }
      };
      const requestCursorFrame = () => {
        if (!raf) raf = requestAnimationFrame(animateCursor);
      };
      const onPointerMove = (event: PointerEvent) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
        cursor.classList.add("is-active");
        requestCursorFrame();
      };
      const onPointerLeave = () => {
        cursor.classList.remove("is-active", "is-view");
        requestCursorFrame();
      };
      const onPointerEnter = () => {
        cursor.classList.add("is-active");
        requestCursorFrame();
      };
      window.addEventListener("pointermove", onPointerMove);
      document.addEventListener("mouseleave", onPointerLeave);
      document.addEventListener("mouseenter", onPointerEnter);

      const hoverTargets = Array.from(document.querySelectorAll<HTMLElement>("a, button"));
      hoverTargets.forEach((target) => {
        const enter = () => cursor.classList.add("is-hovering");
        const leave = () => cursor.classList.remove("is-hovering");
        target.addEventListener("pointerenter", enter);
        target.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          target.removeEventListener("pointerenter", enter);
          target.removeEventListener("pointerleave", leave);
        });
      });

      const viewTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-cursor]"));
      viewTargets.forEach((target) => {
        const enter = () => {
          ball.dataset.label = target.dataset.cursor ?? "";
          cursor.classList.add("is-view");
        };
        const leave = () => {
          cursor.classList.remove("is-view");
          delete ball.dataset.label;
        };
        target.addEventListener("pointerenter", enter);
        target.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          target.removeEventListener("pointerenter", enter);
          target.removeEventListener("pointerleave", leave);
        });
      });

      cleanups.push(() => {
        window.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("mouseleave", onPointerLeave);
        document.removeEventListener("mouseenter", onPointerEnter);
        cancelAnimationFrame(raf);
      });
    }

    return () => {
      body.classList.remove("portfolio-effects-mounted");
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [enabled]);
}
