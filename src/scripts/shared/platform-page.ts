import type { PageSection } from "../../data/shared";

type ScrollOffsetContext = {
  targetId: string;
  headerHeight: number;
};

type InitPlatformPageOptions = {
  heroSectionId: string;
  pageSections: readonly PageSection[];
  getScrollOffset?: (context: ScrollOffsetContext) => number;
};

const defaultScrollOffset = ({ headerHeight }: ScrollOffsetContext) => headerHeight + 24;

const setupSmoothScroll = ({ headerElement, heroSectionId, getScrollOffset }: { headerElement: HTMLElement | null; heroSectionId: string; getScrollOffset: (context: ScrollOffsetContext) => number }) => {
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
    const offset = getScrollOffset({ targetId, headerHeight });

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

const setupSectionNavigation = (headerElement: HTMLElement | null, pageSections: readonly PageSection[]) => {
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

export const initPlatformPage = ({ heroSectionId, pageSections, getScrollOffset = defaultScrollOffset }: InitPlatformPageOptions) => {
  const headerElement = document.querySelector<HTMLElement>("header");

  setupTopbarMenu();
  setupSmoothScroll({ headerElement, heroSectionId, getScrollOffset });
  setupTopbarInstallButton();
  setupSectionNavigation(headerElement, pageSections);
};
