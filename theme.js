(() => {
  const storageKey = "padni-theme";
  const root = document.documentElement;
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

  const readPreference = () => {
    try {
      const value = window.localStorage.getItem(storageKey);
      return value === "light" || value === "dark" ? value : null;
    } catch {
      return null;
    }
  };

  const effectiveTheme = () =>
    root.dataset.theme || (systemTheme.matches ? "dark" : "light");

  const updateChrome = () => {
    const theme = effectiveTheme();
    const nextTheme = theme === "dark" ? "light" : "dark";
    const themeColour = theme === "dark" ? "#101a18" : "#f4f1e8";

    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", themeColour);

    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.dataset.currentTheme = theme;
      button.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
      button.setAttribute("title", `Switch to ${nextTheme} mode`);
      button.querySelector("[data-theme-label]")?.replaceChildren(
        nextTheme === "dark" ? "Dark" : "Light",
      );
    });
  };

  const storedTheme = readPreference();
  if (storedTheme) {
    root.dataset.theme = storedTheme;
  }

  const initialise = () => {
    updateChrome();

    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        const nextTheme = effectiveTheme() === "dark" ? "light" : "dark";
        root.dataset.theme = nextTheme;

        try {
          window.localStorage.setItem(storageKey, nextTheme);
        } catch {
          // The selected theme still applies for this page when storage is blocked.
        }

        updateChrome();
      });
    });

    window.requestAnimationFrame(() => root.classList.add("theme-ready"));
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialise, { once: true });
  } else {
    initialise();
  }

  systemTheme.addEventListener?.("change", () => {
    if (!readPreference()) {
      updateChrome();
    }
  });
})();
