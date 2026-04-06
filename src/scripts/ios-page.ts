import { heroSectionId, pageSections } from "../data/ios";

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

const setupSmoothScroll = (headerElement: HTMLElement | null) => {
  const smoothScrollLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-smooth-scroll]"));

  if (smoothScrollLinks.length === 0) {
    return;
  }

  const getHeaderOffsetHeight = () => {
    if (!(headerElement instanceof HTMLElement)) {
      return 0;
    }

    const topbarShell = headerElement.querySelector<HTMLElement>("[data-topbar-shell]");
    const topbarNavPanel = headerElement.querySelector<HTMLElement>("[data-topbar-nav-panel]");
    let headerHeight = headerElement.offsetHeight;

    if (window.matchMedia("(max-width: 767px)").matches && topbarShell instanceof HTMLElement && topbarNavPanel instanceof HTMLElement) {
      const rowGap = Number.parseFloat(window.getComputedStyle(topbarShell).rowGap) || 0;
      const navPanelHeight = topbarNavPanel.getBoundingClientRect().height;

      headerHeight = Math.max(headerHeight - navPanelHeight - (navPanelHeight > 0 ? rowGap : 0), 0);
    }

    return headerHeight;
  };

  const scrollToSection = (targetId: string) => {
    if (targetId === heroSectionId) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    const targetSection = document.getElementById(targetId);
    if (!(targetSection instanceof HTMLElement)) {
      return;
    }

    const headerHeight = getHeaderOffsetHeight();
    const offset = targetId === "ios-feature-showcase" ? 0 : headerHeight + 24;

    window.scrollTo({
      top: Math.max(targetSection.offsetTop - offset, 0),
      behavior: "smooth",
    });
  };

  smoothScrollLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href?.startsWith("#")) {
        return;
      }

      event.preventDefault();
      scrollToSection(href.slice(1));
    });
  });
};

const setupTopbarInstallButton = () => {
  const heroInstallButton = document.getElementById("hero-install-cta");
  const topbarInstallButton = document.getElementById("topbar-install-cta");

  if (!(heroInstallButton instanceof HTMLElement) || !(topbarInstallButton instanceof HTMLElement)) {
    return;
  }

  const setTopbarVisible = (visible: boolean) => {
    topbarInstallButton.classList.toggle("pointer-events-none", !visible);
    topbarInstallButton.classList.toggle("opacity-0", !visible);
    topbarInstallButton.classList.toggle("pointer-events-auto", visible);
    topbarInstallButton.classList.toggle("opacity-100", visible);
    topbarInstallButton.setAttribute("aria-hidden", String(!visible));

    if (visible) {
      topbarInstallButton.removeAttribute("tabindex");
      return;
    }

    topbarInstallButton.setAttribute("tabindex", "-1");
  };

  setTopbarVisible(false);

  const observer = new IntersectionObserver(
    ([entry]) => {
      setTopbarVisible(!entry?.isIntersecting);
    },
    { threshold: 0 },
  );

  observer.observe(heroInstallButton);
};

const setupTopbarMenu = () => {
  const topbarShell = document.querySelector<HTMLElement>("[data-topbar-shell]");
  const topbarNavPanel = document.querySelector<HTMLElement>("[data-topbar-nav-panel]");
  const topbarMenuToggle = document.querySelector<HTMLButtonElement>("[data-topbar-menu-toggle]");
  const topbarMenuLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-topbar-menu-link]"));

  if (!(topbarShell instanceof HTMLElement) || !(topbarNavPanel instanceof HTMLElement) || !(topbarMenuToggle instanceof HTMLButtonElement)) {
    return;
  }

  const topbarOpenIcon = topbarMenuToggle.querySelector<HTMLElement>('[data-topbar-menu-icon="open"]');
  const topbarCloseIcon = topbarMenuToggle.querySelector<HTMLElement>('[data-topbar-menu-icon="close"]');
  const desktopMediaQuery = window.matchMedia("(min-width: 768px)");

  const setTopbarMenuExpanded = (expanded: boolean) => {
    const isExpanded = expanded && !desktopMediaQuery.matches;

    topbarShell.dataset.topbarExpanded = String(isExpanded);
    topbarNavPanel.setAttribute("aria-hidden", String(!isExpanded && !desktopMediaQuery.matches));
    topbarMenuToggle.setAttribute("aria-expanded", String(isExpanded));
    topbarMenuToggle.setAttribute("aria-label", isExpanded ? "收起导航菜单" : "展开导航菜单");
    topbarOpenIcon?.classList.toggle("hidden", isExpanded);
    topbarCloseIcon?.classList.toggle("hidden", !isExpanded);
  };

  const syncTopbarMenuForViewport = () => {
    setTopbarMenuExpanded(false);
    topbarNavPanel.setAttribute("aria-hidden", String(!desktopMediaQuery.matches));
  };

  setTopbarMenuExpanded(false);
  topbarNavPanel.setAttribute("aria-hidden", String(!desktopMediaQuery.matches));

  topbarMenuToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    setTopbarMenuExpanded(topbarShell.dataset.topbarExpanded !== "true");
  });

  topbarMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setTopbarMenuExpanded(false);
    });
  });

  document.addEventListener("click", (event) => {
    if (desktopMediaQuery.matches || topbarShell.dataset.topbarExpanded !== "true") {
      return;
    }

    if (event.target instanceof Node && !topbarShell.contains(event.target)) {
      setTopbarMenuExpanded(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setTopbarMenuExpanded(false);
    }
  });

  if (typeof desktopMediaQuery.addEventListener === "function") {
    desktopMediaQuery.addEventListener("change", syncTopbarMenuForViewport);
    return;
  }

  desktopMediaQuery.addListener(syncTopbarMenuForViewport);
};

const setupSectionNavigation = (headerElement: HTMLElement | null) => {
  const sectionLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-section-link]"));
  const pageSectionElements = pageSections.map((section) => document.getElementById(section.id)).filter((section): section is HTMLElement => section instanceof HTMLElement);

  if (sectionLinks.length === 0 || pageSectionElements.length === 0) {
    return;
  }

  let navTicking = false;

  const updateActiveSectionLink = () => {
    navTicking = false;

    const headerHeight = headerElement instanceof HTMLElement ? headerElement.offsetHeight : 0;
    const triggerY = window.scrollY + headerHeight + 48;
    let activeSectionId = "";

    pageSectionElements.forEach((section) => {
      if (section.offsetTop <= triggerY) {
        activeSectionId = section.id;
      }
    });

    sectionLinks.forEach((link) => {
      const targetId = link.getAttribute("href")?.slice(1);
      const isActive = targetId === activeSectionId;
      link.classList.toggle("text-blue-700", isActive);
      link.classList.toggle("text-zinc-500", !isActive);
      link.classList.toggle("hover:text-zinc-900", !isActive);
      link.classList.toggle("bg-blue-50", isActive && link.hasAttribute("data-mobile-section-link"));
      link.classList.toggle("hover:bg-zinc-100", !isActive && link.hasAttribute("data-mobile-section-link"));

      if (isActive) {
        link.setAttribute("aria-current", "page");
        return;
      }

      link.removeAttribute("aria-current");
    });
  };

  const requestActiveSectionLinkUpdate = () => {
    if (navTicking) {
      return;
    }

    navTicking = true;
    window.requestAnimationFrame(updateActiveSectionLink);
  };

  updateActiveSectionLink();
  window.addEventListener("scroll", requestActiveSectionLinkUpdate, { passive: true });
  window.addEventListener("resize", requestActiveSectionLinkUpdate);
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
  const headerElement = document.querySelector<HTMLElement>("header");

  setupTopbarMenu();
  setupSmoothScroll(headerElement);
  setupTopbarInstallButton();
  setupSectionNavigation(headerElement);
  setupDesktopFeatureShowcase();
  setupMobileFeatureShowcase();
};
