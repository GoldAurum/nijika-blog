(function () {
	// 👉 Sustituye por la URL donde corra tu server.js
	const API_URL = "https://TU-SERVIDOR";

	const container = document.querySelector(".likes");
	if (!container || API_URL.includes("TU-SERVIDOR")) return;

	const rawId = container.dataset.postId || location.pathname;
	const slug = rawId.replace(/^\/|\/$/g, "") || "home";

	const button = container.querySelector(".like-button");
	const countEl = container.querySelector(".like-count");
	const storageKey = `liked:${slug}`;

	function render(count, liked) {
		countEl.textContent = count;
		button.classList.toggle("liked", liked);
		button.setAttribute("aria-pressed", liked ? "true" : "false");
	}

	function isLiked() {
		return localStorage.getItem(storageKey) === "1";
	}

	// Cargar el contador actual sin modificarlo
	fetch(`${API_URL}/api/like/${encodeURIComponent(slug)}`)
		.then((r) => r.json())
		.then((data) => render(data.likes, isLiked()))
		.catch(() => render("–", isLiked()));

	button.addEventListener("click", () => {
		const action = isLiked() ? "remove" : "add";

		fetch(`${API_URL}/api/like/${encodeURIComponent(slug)}?action=${action}`, {
			method: "POST",
		})
			.then((r) => r.json())
			.then((data) => {
				localStorage.setItem(storageKey, action === "add" ? "1" : "0");
				render(data.likes, action === "add");
			})
			.catch(() => {});
	});
})();
