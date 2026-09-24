
	const nijika = document.getElementById("nijika-toggle");
	const sound = document.getElementById("nijika-sound");

	nijika.addEventListener("click", () => {
		const oneko = document.querySelector(".oneko");

		if (!oneko) {
			return;
		}

		oneko.remove();

		sound.currentTime = 0;
		sound.play();
	}, true);