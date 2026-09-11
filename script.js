const body = document.body;
const themeToggle = document.querySelector(".theme-toggle");
const themeLabel = document.querySelector(".theme-label");
const themeIcon = document.querySelector(".theme-icon");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const dialog = document.querySelector(".join-dialog");
const openDialogButtons = document.querySelectorAll(".js-open-dialog");
const closeDialog = document.querySelector(".dialog-close");
const joinForm = document.querySelector(".join-form");
const formMessage = document.querySelector(".form-message");

function setTheme(theme) {
  const isDark = theme === "dark";
  body.classList.toggle("dark", isDark);
  themeLabel.textContent = isDark ? "Dark mode" : "Light mode";
  themeIcon.textContent = isDark ? "☾" : "☼";
  themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
  localStorage.setItem("dsce-theme", theme);
}

setTheme(localStorage.getItem("dsce-theme") || "light");
themeToggle.addEventListener("click", () => setTheme(body.classList.contains("dark") ? "light" : "dark"));

menuToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const featureContent = [
  ["Your campus compass", "Always know what's next.", "From club meetups to career opportunities, the right information is just a tap away.", "⌕"],
  ["Your people, together", "Find your community.", "Connect with classmates, clubs, and mentors who make every semester more meaningful.", "♧"],
  ["Your next chapter", "Turn plans into progress.", "Keep your achievements close and discover opportunities that move your future forward.", "↗"],
];

document.querySelectorAll(".feature-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const index = Number(tab.dataset.feature);
    const panel = document.querySelector(".feature-panel");
    const [eyebrow, title, description, icon] = featureContent[index];
    document.querySelectorAll(".feature-tab").forEach((item) => {
      const active = item === tab;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
    });
    panel.setAttribute("aria-labelledby", tab.id);
    panel.innerHTML = `<div class="panel-illustration"><span class="illustration-ring ring-one"></span><span class="illustration-ring ring-two"></span><span class="illustration-icon">${icon}</span></div><div><p class="eyebrow">${eyebrow}</p><h3>${title}</h3><p>${description}</p><a class="text-link" href="#how-it-works">See how it works <span aria-hidden="true">→</span></a></div>`;
  });
});

openDialogButtons.forEach((button) => button.addEventListener("click", () => {
  dialog.showModal();
  dialog.querySelector("input").focus();
}));
closeDialog.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
joinForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "You're on the list! We'll be in touch soon.";
  joinForm.reset();
});
