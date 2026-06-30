import { useState, watch, type Ref } from '#imports';

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

// Guards the one-time client-side hydration of the persisted collapse state.
let initialized = false;

/**
 * Shared sidebar state, used by both the navbar toggles and the chat sidebar.
 *
 * State is held in request-scoped `useState` so it is SSR-safe and shared across
 * every component that calls this composable.
 */
export function useSidebar(): UseSidebarReturn {
  const isCollapsed = useState('sidebar-collapsed', () => false);
  const isMobileOpen = useState('sidebar-mobile-open', () => false);

  // Server renders the default; the client restores from localStorage on first use.
  if (!initialized && import.meta.client) {
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

  return { isCollapsed, isMobileOpen, toggle, closeMobile };
}
