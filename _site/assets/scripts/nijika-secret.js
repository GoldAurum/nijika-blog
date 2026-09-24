(() => {
    const palabraSecreta = "nijika";
    let entrada = "";

    document.addEventListener("keydown", (event) => {

        // Ignorar teclas especiales
        if (event.key.length !== 1) {
            return;
        }

        entrada += event.key.toLowerCase();

        // Mantener solamente las últimas letras
        if (entrada.length > palabraSecreta.length) {
            entrada = entrada.slice(-palabraSecreta.length);
        }

        console.log("Tecla:", event.key, "Entrada:", entrada);

        if (entrada === palabraSecreta) {
            console.log("¡NIJIKA ACTIVADA!");
            aparecerNijika();
            entrada = "";
        }
    });

    function aparecerNijika() {

        const nijika = document.createElement("img");

        nijika.src = "/assets/boo.png";
        nijika.alt = "Nijika";

        nijika.style.position = "fixed";
        nijika.style.left = "50%";
        nijika.style.bottom = "0";
        nijika.style.width = "300px";
        nijika.style.zIndex = "99999";
        nijika.style.transform = "translateX(-50%)";

        document.body.appendChild(nijika);

        // Sonido
        const sonido = new Audio("/assets/pachipachi.mp3");
        sonido.volume = 1;
        sonido.play().catch(error => {
            console.error("No se pudo reproducir el sonido:", error);
        });

        // Salto
    nijika.animate(
    [
        {
            transform: "translate(-50%, 0)",
            opacity: 1
        },
        {
            transform: "translate(-50%, -200px)",
            opacity: 1
        },
        {
            transform: "translate(-50%, 0)",
            opacity: 1
        },
        {
            transform: "translate(-50%, 0)",
            opacity: 1,
            offset: 0.85
        },
        {
            transform: "translate(-50%, 0)",
            opacity: 0
        }
    ],
    {
        duration: 2500,
        easing: "ease-out"
    }
);

setTimeout(() => {
    nijika.remove();
}, 2500);}
})();

