document.addEventListener("DOMContentLoaded", () => {
	const nijikaGif = document.getElementById("nijika-gif");
	const nijikaSound = document.getElementById("nijika-sound");

	if (!nijikaGif || !nijikaSound) {
		console.error("No se encontró Nijika o su sonido.");
		return;
	}

	nijikaGif.addEventListener("click", () => {
		nijikaSound.currentTime = 0;

		nijikaSound.play().catch((error) => {
			console.error("No se pudo reproducir el sonido:", error);
		});
	});
});