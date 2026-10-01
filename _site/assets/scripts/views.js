(function () {
	// 👉 Misma URL que en likes.js
	const API_URL = "https://TU-SERVIDOR";

	const el = document.querySelector(".views-count");
	if (!el || API_URL.includes("TU-SERVIDOR")) return;

	const slug = (el.dataset.postId || location.pathname)
		.replace(/^\/|\/$/g, "") || "home";

	// Una vista por slug y por sesión de navegador, para no inflar el
	// contador solo por recargar la página
	const sessionKey = `viewed:${slug}`;
	const alreadyCounted = sessionStorage.getItem(sessionKey) === "1";

	const endpoint = `${API_URL}/api/view/${encodeURIComponent(slug)}`;

	const request = alreadyCounted
		? fetch(endpoint) // solo leer
		: fetch(endpoint, { method: "POST" }).then((r) => {
				sessionStorage.setItem(sessionKey, "1");
				return r;
			});

	request
		.then((r) => r.json())
		.then((data) => {
			el.textContent = data.views;
		})
		.catch(() => {
			el.textContent = "–";
		});
})();
