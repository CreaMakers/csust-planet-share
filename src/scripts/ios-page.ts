import { featureShowcaseSectionId, heroSectionId, pageSections } from "../data/ios";
import { initPlatformPage } from "./shared/platform-page";

type FeaturePlatform = "iphone" | "ipad" | "mac";

const setFadeVisibility = (element: HTMLElement, isActive: boolean) => {
  element.classList.toggle("pointer-events-none", !isActive);
  element.classList.toggle("opacity-0", !isActive);
  element.classList.toggle("opacity-100", isActive);
  element.setAttribute("aria-hidden", String(!isActive));
};

const updatePlatformButtons = (buttons: HTMLButtonElement[], activePlatform: FeaturePlatform, indicator: HTMLElement | null) => {
  buttons.forEach((button) => {
    const isActive = button.dataset.platform === activePlatform;
    button.classList.toggle("text-zinc-900", isActive);
    button.classList.toggle("text-zinc-500", !isActive);
    button.classList.toggle("hover:text-zinc-900", !isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (!(indicator instanceof HTMLElement)) {
    return;
  }

  const activeIndex = buttons.findIndex((button) => button.dataset.platform === activePlatform);
  indicator.style.transform = `translateX(${Math.max(activeIndex, 0) * 100}%)`;
};

const setupDesktopFeatureShowcase = () => {
  const featureShowcase = document.querySelector<HTMLElement>("[data-feature-showcase-desktop]");
  const featureCopies = Array.from(document.querySelectorAll<HTMLElement>("[data-feature-copy]"));
  const featureVisuals = Array.from(document.querySelectorAll<HTMLElement>("[data-feature-visual]"));
  const featurePlatformButtons = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-feature-platform-button]"));
  const featurePlatformIndicator = document.getElementById("feature-platform-indicator");

  if (!(featureShowcase instanceof HTMLElement) || featureCopies.length === 0 || featureVisuals.length === 0) {
    return;
  }

  let activeSlideIndex = -1;
  let activePlatform: FeaturePlatform = "iphone";
  let ticking = false;

  const updateFeatureCopies = () => {
    featureCopies.forEach((element, index) => {
      setFadeVisibility(element, index === activeSlideIndex);
    });
  };

  const updateFeatureVisuals = () => {
    featureVisuals.forEach((element) => {
      const isActive = Number(element.dataset.slideIndex) === activeSlideIndex && element.dataset.platform === activePlatform;
      setFadeVisibility(element, isActive);
    });
  };

  const setActiveSlide = (nextIndex: number) => {
    if (nextIndex === activeSlideIndex) {
      return;
    }

    activeSlideIndex = nextIndex;
    updateFeatureCopies();
    updateFeatureVisuals();
  };

  const setActivePlatform = (nextPlatform: FeaturePlatform) => {
    if (nextPlatform === activePlatform) {
      return;
    }

    activePlatform = nextPlatform;
    updatePlatformButtons(featurePlatformButtons, activePlatform, featurePlatformIndicator);
    updateFeatureVisuals();
  };

  const updateFeatureShowcase = () => {
    ticking = false;

    const scrollDistance = featureShowcase.offsetHeight - window.innerHeight;
    if (scrollDistance <= 0) {
      setActiveSlide(0);
      return;
    }

    const rect = featureShowcase.getBoundingClientRect();
    const progress = Math.min(Math.max(-rect.top / scrollDistance, 0), 1);
    const nextIndex = Math.min(featureCopies.length - 1, Math.floor(progress * featureCopies.length));
    setActiveSlide(nextIndex);
  };

  const requestFeatureShowcaseUpdate = () => {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(updateFeatureShowcase);
  };

  setActiveSlide(0);
  updatePlatformButtons(featurePlatformButtons, activePlatform, featurePlatformIndicator);
  updateFeatureVisuals();
  updateFeatureShowcase();

  window.addEventListener("scroll", requestFeatureShowcaseUpdate, { passive: true });
  window.addEventListener("resize", requestFeatureShowcaseUpdate);

  featurePlatformButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextPlatform = button.dataset.platform;
      if (nextPlatform === "iphone" || nextPlatform === "ipad" || nextPlatform === "mac") {
        setActivePlatform(nextPlatform);
      }
    });
  });
};

const setupMobileFeatureShowcase = () => {
  const mobileFeatureScroller = document.querySelector<HTMLElement>("[data-mobile-feature-scroller]");
  const mobileFeatureCopies = Array.from(document.querySelectorAll<HTMLElement>("[data-mobile-feature-copy]"));
  const mobileFeatureSlides = Array.from(document.querySelectorAll<HTMLElement>("[data-mobile-feature-slide]"));
  const mobileFeatureVisuals = Array.from(document.querySelectorAll<HTMLElement>("[data-mobile-feature-visual]"));
  const mobileFeaturePlatformButtons = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-mobile-feature-platform-button]"));
  const mobileFeaturePlatformIndicator = document.getElementById("mobile-feature-platform-indicator");
  const mobileFeaturePrevButton = document.querySelector<HTMLButtonElement>("[data-mobile-feature-prev]");
  const mobileFeatureNextButton = document.querySelector<HTMLButtonElement>("[data-mobile-feature-next]");

  if (!(mobileFeatureScroller instanceof HTMLElement) || mobileFeatureCopies.length === 0 || mobileFeatureSlides.length === 0 || mobileFeatureVisuals.length === 0) {
    return;
  }

  let activeMobileSlideIndex = -1;
  let activeMobilePlatform: FeaturePlatform = "iphone";
  let mobileTicking = false;

  const updateMobileFeatureCopies = () => {
    mobileFeatureCopies.forEach((element, index) => {
      setFadeVisibility(element, index === activeMobileSlideIndex);
    });
  };

  const updateMobileFeatureVisuals = () => {
    mobileFeatureVisuals.forEach((element) => {
      const isActive = Number(element.dataset.slideIndex) === activeMobileSlideIndex && element.dataset.platform === activeMobilePlatform;
      setFadeVisibility(element, isActive);
    });
  };

  const updateMobileFeatureArrowButtons = () => {
    if (mobileFeaturePrevButton instanceof HTMLButtonElement) {
      mobileFeaturePrevButton.disabled = activeMobileSlideIndex <= 0;
    }

    if (mobileFeatureNextButton instanceof HTMLButtonElement) {
      mobileFeatureNextButton.disabled = activeMobileSlideIndex >= mobileFeatureSlides.length - 1;
    }
  };

  const setActiveMobileSlide = (nextIndex: number) => {
    if (nextIndex === activeMobileSlideIndex) {
      return;
    }

    activeMobileSlideIndex = nextIndex;
    updateMobileFeatureCopies();
    updateMobileFeatureVisuals();
    updateMobileFeatureArrowButtons();
  };

  const setActiveMobilePlatform = (nextPlatform: FeaturePlatform) => {
    if (nextPlatform === activeMobilePlatform) {
      return;
    }

    activeMobilePlatform = nextPlatform;
    updatePlatformButtons(mobileFeaturePlatformButtons, activeMobilePlatform, mobileFeaturePlatformIndicator);
    updateMobileFeatureVisuals();
  };

  const updateMobileFeatureShowcase = () => {
    mobileTicking = false;

    const scrollerRect = mobileFeatureScroller.getBoundingClientRect();
    const scrollerCenter = scrollerRect.left + scrollerRect.width / 2;
    let closestSlideIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    mobileFeatureSlides.forEach((slide, index) => {
      const rect = slide.getBoundingClientRect();
      const slideCenter = rect.left + rect.width / 2;
      const distance = Math.abs(slideCenter - scrollerCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestSlideIndex = index;
      }
    });

    setActiveMobileSlide(closestSlideIndex);
  };

  const requestMobileFeatureShowcaseUpdate = () => {
    if (mobileTicking) {
      return;
    }

    mobileTicking = true;
    window.requestAnimationFrame(updateMobileFeatureShowcase);
  };

  const scrollToMobileSlide = (nextIndex: number) => {
    const targetSlide = mobileFeatureSlides[nextIndex];
    if (!(targetSlide instanceof HTMLElement)) {
      return;
    }

    mobileFeatureScroller.scrollTo({
      left: targetSlide.offsetLeft,
      behavior: "smooth",
    });
  };

  setActiveMobileSlide(0);
  updatePlatformButtons(mobileFeaturePlatformButtons, activeMobilePlatform, mobileFeaturePlatformIndicator);
  updateMobileFeatureVisuals();
  updateMobileFeatureShowcase();

  mobileFeatureScroller.addEventListener("scroll", requestMobileFeatureShowcaseUpdate, { passive: true });
  window.addEventListener("resize", requestMobileFeatureShowcaseUpdate);

  mobileFeaturePlatformButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextPlatform = button.dataset.platform;
      if (nextPlatform === "iphone" || nextPlatform === "ipad" || nextPlatform === "mac") {
        setActiveMobilePlatform(nextPlatform);
      }
    });
  });

  if (mobileFeaturePrevButton instanceof HTMLButtonElement) {
    mobileFeaturePrevButton.addEventListener("click", () => {
      scrollToMobileSlide(Math.max(activeMobileSlideIndex - 1, 0));
    });
  }

  if (mobileFeatureNextButton instanceof HTMLButtonElement) {
    mobileFeatureNextButton.addEventListener("click", () => {
      scrollToMobileSlide(Math.min(activeMobileSlideIndex + 1, mobileFeatureSlides.length - 1));
    });
  }
};

export const initIosPage = () => {
  initPlatformPage({
    heroSectionId,
    pageSections,
    getScrollOffset: ({ targetId, headerHeight }) => (targetId === featureShowcaseSectionId ? 0 : headerHeight + 24),
  });
  setupDesktopFeatureShowcase();
  setupMobileFeatureShowcase();
};
