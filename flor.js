onload = () => {
    setTimeout(() => document.body.classList.remove("not-loaded"), 1000);
};

// Mensajes posibles
const messages = ["Te quiero", "Eres hermosa", "Eres genial", "Me encantas", 
  "Eres especial", "Me haces sonreir", "Divina!", "Una lindura","❤️​","🤗​","✨"];

// Partículas y mensajes
function createParticles(x, y) {
    const colors = ["#ff5fd2", "#9b5cff", "#5fdcff", "#ffd65f", "#ffffff"];
    for (let i = 0; i < 18; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 120;

        particle.style.left = x + "px";
        particle.style.top = y + "px";
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.setProperty("--x", Math.cos(angle) * distance + "px");
        particle.style.setProperty("--y", Math.sin(angle) * distance + "px");

        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    }
}

function showMessage(x, y) {
    const message = document.createElement("span");
    message.classList.add("message");
    message.textContent = messages[Math.floor(Math.random() * messages.length)];
    message.style.left = x + "px";
    message.style.top = y + "px";
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 1500);
}

// Función para partículas + mensaje
function handleClick(x, y) {
    createParticles(x, y);
    showMessage(x, y);
}

// Luces navideñas
function createChristmasLights(x, y) {
    const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#ffffff"];
    for (let i = 0; i < 80; i++) {
        const particle = document.createElement("div");
        particle.classList.add("lightParticle");

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 300;

        particle.style.left = x + "px";
        particle.style.top = y + "px";
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.setProperty("--x", Math.cos(angle) * distance + "px");
        particle.style.setProperty("--y", Math.sin(angle) * distance + "px");

        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1500);
    }
}

// --- LISTENERS ---

// Primer clic/tap: mensaje inicial desaparece
const startMessage = document.querySelector(".startMessage");
document.addEventListener("pointerdown", () => {
    if (startMessage) {
        startMessage.style.transition = "opacity 0.5s";
        startMessage.style.opacity = 0;
        setTimeout(() => startMessage.remove(), 500);
    }
}, { once: true });

// Partículas y mensajes
document.addEventListener("click", (e) => handleClick(e.clientX, e.clientY));
document.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    handleClick(touch.clientX, touch.clientY);
});

// Luces navideñas: doble clic desktop
document.addEventListener("dblclick", (e) => {
    createChristmasLights(e.clientX, e.clientY);
    if (navigator.vibrate) navigator.vibrate(200);
});

// Luces navideñas: doble tap móvil
let lastTap = 0;
document.addEventListener("touchend", (e) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    if (tapLength < 300 && tapLength > 0) {
        const touch = e.changedTouches[0];
        createChristmasLights(touch.clientX, touch.clientY);
        if (navigator.vibrate) navigator.vibrate([100,50,100]);
    }
    lastTap = currentTime;
    e.preventDefault(); // evita zoom y flash azul
});
