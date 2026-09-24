(function () {
	const NUM_FLAKES = 40;
	const CHARACTERS = ["❄", "❅", "❆"];

	const container = document.createElement("div");
	container.className = "snow-container";
	document.body.prepend(container);

	for (let i = 0; i < NUM_FLAKES; i++) {
		const flake = document.createElement("span");
		flake.className = "snowflake";
		flake.textContent = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];

		const left = Math.random() * 100; // vw
		const size = 0.6 + Math.random() * 1.4; // rem
		const duration = 8 + Math.random() * 14; // s
		const delay = Math.random() * -duration; // arranca ya a media caída
		const opacity = 0.4 + Math.random() * 0.6;

		flake.style.left = `${left}vw`;
		flake.style.fontSize = `${size}rem`;
		flake.style.opacity = opacity;
		flake.style.animationDuration = `${duration}s`;
		flake.style.animationDelay = `${delay}s`;

		container.appendChild(flake);
	}
})();
