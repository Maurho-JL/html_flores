
onload = () => {
    const c = setTimeout(() => {
      document.body.classList.remove("not-loaded");
      clearTimeout(c);
    }, 1000);
  };



// Mensajes posibles
const messages = ["Te quiero", "Eres hermosa", "Eres genial", "Me encantas", 
  "Eres especial", "Me haces sonreir" , "Divina!","Am!"];

document.addEventListener("click", (e) => {
    

    createParticles(e.clientX, e.clientY);
    showMessage(e.clientX, e.clientY);
});

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

    // Eliminar mensaje después de la animación
    setTimeout(() => message.remove(), 1500);
}


// Doble clic para show de luces

document.addEventListener("dblclick", (e) => {
    createChristmasLights(e.clientX, e.clientY);
});

function createChristmasLights(x, y) {
    const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#ffffff"];
    
    for (let i = 0; i < 80; i++) { // muchas partículas para efecto show
        const particle = document.createElement("div");
        particle.classList.add("lightParticle");

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 300; // gran dispersión

        particle.style.left = x + "px";
        particle.style.top = y + "px";
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        particle.style.setProperty("--x", Math.cos(angle) * distance + "px");
        particle.style.setProperty("--y", Math.sin(angle) * distance + "px");

        document.body.appendChild(particle);

        setTimeout(() => particle.remove(), 1500);
    }
}

function handleClick(x, y) {
    createParticles(x, y);
    showMessage(x, y);
}

// Desktop
document.addEventListener("click", (e) => handleClick(e.clientX, e.clientY));

// Móviles
document.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    handleClick(touch.clientX, touch.clientY);
});

// Desktop
document.addEventListener("dblclick", (e) => {
    createChristmasLights(e.clientX, e.clientY);
});

// Móviles: doble tap
let lastTap = 0;
document.addEventListener("touchend", (e) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    if (tapLength < 300 && tapLength > 0) { // doble tap
        const touch = e.changedTouches[0];
        createChristmasLights(touch.clientX, touch.clientY);
    }
    lastTap = currentTime;
});

