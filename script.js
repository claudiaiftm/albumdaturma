document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeToggle = document.querySelector("#themeToggle");
  const menuToggle = document.querySelector("#menuToggle");
  const mobileNav = document.querySelector("#mobileNav");
  const savedTheme = localStorage.getItem("album-theme");

  if (themeToggle) {
    if (savedTheme === "dark" || (!savedTheme && matchMedia("(prefers-color-scheme: dark)").matches)) {
      body.classList.add("dark");
      themeToggle.textContent = "☀";
    }

    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark");
      const isDark = body.classList.contains("dark");
      themeToggle.textContent = isDark ? "☀" : "☾";
      localStorage.setItem("album-theme", isDark ? "dark" : "light");
    });
  }

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      mobileNav.classList.toggle("open");
    });

    document.querySelectorAll(".mobile-nav a").forEach((link) => {
      link.addEventListener("click", () => mobileNav.classList.remove("open"));
    });
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
  } else {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
  }

  document.querySelectorAll("[data-count]").forEach((counter) => {
    const target = Number(counter.dataset.count);
    let current = 0;
    const step = Math.max(1, Math.round(target / 70));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = target >= 1000 ? current.toLocaleString("pt-BR") + "+" : String(current);
    }, 24);
  });

  const packButton = document.querySelector("#packButton");
  const packCards = document.querySelector("#packCards");

  if (packButton && packCards) {
    packButton.addEventListener("click", () => {
      packButton.classList.toggle("open");
      packCards.classList.toggle("open");
      const label = packButton.querySelector("small");
      if (label) {
        label.textContent = packButton.classList.contains("open")
          ? "Clique para fechar"
          : "Clique para abrir";
      }
    });
  }

  const selectedTags = document.querySelector("#selectedTags");

  function renderTags() {
    if (!selectedTags) return;
    selectedTags.innerHTML = "";
    document.querySelectorAll(".chip.active").forEach((chip) => {
      const tag = document.createElement("span");
      tag.textContent = chip.textContent.trim();
      selectedTags.appendChild(tag);
    });
  }

  document.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      chip.classList.toggle("active");
      renderTags();
    });
  });

  renderTags();

  document.querySelectorAll(".faq-item button").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      if (!item) return;

      document.querySelectorAll(".faq-item").forEach((faq) => {
        if (faq !== item) faq.classList.remove("active");
      });

      item.classList.toggle("active");
    });
  });
});
