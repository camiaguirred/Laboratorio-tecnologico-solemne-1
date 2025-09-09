const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

const areas = [
{ nombre: "Área Técnica", porcentaje: 20, color:"#ffffff", petalos: 20 },
{ nombre: "Área de Edición", porcentaje: 10, color: "#a3c9f9", petalos: 6 },
{ nombre: "Área de Actores", porcentaje: 61, color: "#b46cc8", petalos: 8 },
{ nombre: "Área Creativa", porcentaje: 10, color: "#f4a261", petalos: 6 }
];

const circleOpacity = 0.7;
let angle = 0;

function drawBackground() {
let gradient = ctx.createLinearGradient(0, 0, 0, height);
gradient.addColorStop(0, "#cde0e9");
gradient.addColorStop(1, "#eef6f9");
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, width, height);

ctx.fillStyle = "#9bb5a7";
ctx.beginPath();
ctx.moveTo(0, height * 0.75);
ctx.lineTo(width * 0.20, height * 0.50);
ctx.lineTo(width * 0.55, height * 0.7);
ctx.lineTo(width * 0.85, height * 0.5);
ctx.lineTo(width, height * 0.7);
ctx.lineTo(width, height);
ctx.lineTo(0, height);
ctx.closePath();
ctx.fill();
}

function drawFlower(x, y, petalos, color, size, rotation = 0, porcentaje = null) {
ctx.save();
ctx.translate(x, y);
ctx.rotate(rotation);

for (let i = 0; i < petalos; i++) {
ctx.beginPath();
ctx.rotate((2 * Math.PI) / petalos);
ctx.moveTo(0, 0);
ctx.quadraticCurveTo(size, size / 2, 0, size);
ctx.quadraticCurveTo(-size, size / 2, 0, 0);
ctx.fillStyle = color;
ctx.fill();
}

ctx.beginPath();
ctx.arc(0, 0, size * 0.3, 0, 2 * Math.PI);
ctx.fillStyle = "#ffd166";
ctx.fill();

if (porcentaje !== null) {
ctx.beginPath();
ctx.arc(0, 0, size * 0.6, 0, 2 * Math.PI);
ctx.fillStyle = `rgba(255,255,255,${circleOpacity})`;
ctx.fill();

ctx.fillStyle = "#000";
ctx.font = "bold 28px 'Times New Roman', serif";
ctx.textAlign = "center";
ctx.fillText(porcentaje + "%", 0, 10);
}

ctx.restore();
}

function draw() {
ctx.clearRect(0, 0, width, height);
drawBackground();

ctx.fillStyle = "#000";
ctx.font = "bold 48px 'Times New Roman', serif";
ctx.textAlign = "center";
ctx.fillText("MIDSOMMAR", width / 2, 80);

ctx.font = "22px 'Times New Roman', serif";
ctx.fillText("Distribución de roles en la producción", width / 2, 120);

// Flores con porcentajes arriba
let spacing = width / (areas.length + 2);
areas.forEach((area, i) => {
let x = spacing * (i + 1.5);
let y = 260;
drawFlower(x, y, area.petalos, area.color, 50, angle / 80, area.porcentaje);
});

// Bloques descriptivos ajustados
let baseY = 380;
let separacion = 140;
areas.forEach((area, i) => {
let x = width / 2;
let y = baseY + i * separacion;

drawFlower(x - 200, y, area.petalos, area.color, 60, -angle / 100);

ctx.fillStyle = "#000";
ctx.font = "bold 28px 'Times New Roman', serif";
ctx.textAlign = "left";
ctx.fillText(area.nombre, x - 120, y);

ctx.font = "20px 'Times New Roman', serif";
ctx.fillText(area.porcentaje + "% del equipo", x - 120, y + 30);
});

// Texto final
ctx.fillStyle = "#000";
ctx.font = "18px 'Times New Roman', serif";
ctx.textAlign = "center";
ctx.fillText("Los porcentajes reflejan cómo se distribuyó el trabajo en la película,", width / 2, height - 120);
ctx.fillText("indicando la cantidad de personas que participaron en cada rol.", width / 2, height - 90);

angle += 1;
requestAnimationFrame(draw);
}

draw();
