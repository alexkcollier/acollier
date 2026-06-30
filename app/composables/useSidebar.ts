import { ref, watch, type Ref } from '#imports';

const LG_BREAKPOINT = 960;

interface UseSidebarReturn {
  /** Desktop docked-vs-rail state; persisted to localStorage. */
  isCollapsed: Ref<boolean>;
  /** Transient mobile overlay state; not persisted. */
  isMobileOpen: Ref<boolean>;
  /** Toggles the relevant state for the current viewport. */
  toggle: () => void;
  /** Closes the mobile overlay. */
  closeMobile: () => void;
}

const isCollapsed = ref(false);
const isMobileOpen = ref(false);

let initialized = false;

function init() {
  if (initialized || !import.meta.client) {
    return;
  }

  initialized = true;
  isCollapsed.value = localStorage.getItem('sidebar-collapsed') === 'true';

  watch(isCollapsed, (val) => {
    localStorage.setItem('sidebar-collapsed', String(val));
  });
}

function toggle() {
  if (window.matchMedia(`(min-width: ${LG_BREAKPOINT + 0.01}px)`).matches) {
    isCollapsed.value = !isCollapsed.value;
  } else {
    isMobileOpen.value = !isMobileOpen.value;
  }
}

function closeMobile() {
  isMobileOpen.value = false;
}

export function useSidebar(): UseSidebarReturn {
  init();

  return { isCollapsed, isMobileOpen, toggle, closeMobile };
}
