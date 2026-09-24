const toggle = document.getElementById("theme-toggle");

    const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
    document.documentElement.dataset.theme = savedTheme;
    toggle.checked = savedTheme === "light";
}

toggle.addEventListener("change", () => {
    const theme = toggle.checked ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
});