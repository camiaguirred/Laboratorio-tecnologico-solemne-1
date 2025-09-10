// canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

let areas = [];
const circleOpacity = 0.7;
let angle = 0;

// fondo
function drawBackground() {
  let gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "#cde0e9");
  gradient.addColorStop(1, "#eef6f9");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#9bb5a7";
  ctx.beginPath();
  ctx.moveTo(0, height * 0.75);
  ctx.lineTo(width * 0.25, height * 0.55);
  ctx.lineTo(width * 0.55, height * 0.7);
  ctx.lineTo(width * 0.85, height * 0.5);
  ctx.lineTo(width, height * 0.7);
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.closePath();
  ctx.fill();
}

// flor
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
    ctx.font = "bold 26px 'Times New Roman', serif";
    ctx.textAlign = "center";
    ctx.fillText(porcentaje + "%", 0, 8);
  }

  ctx.restore();
}

// dibuja todo
function draw() {
  ctx.clearRect(0, 0, width, height);
  drawBackground();

  // título
  ctx.fillStyle = "#000";
  ctx.font = "bold 46px 'Times New Roman', serif";
  ctx.textAlign = "center";
  ctx.fillText("MIDSOMMAR", width / 2, 100);

  ctx.font = "22px 'Times New Roman', serif";
  ctx.fillText("Distribución de roles en la producción", width / 2, 150);

  // flores arriba
  let spacing = width / (areas.length + 2);
  areas.forEach((area, i) => {
    let x = spacing * (i + 1.5);
    let y = 300; // más abajo
    drawFlower(x, y, area.petalos, area.color, 55, angle / 80, area.porcentaje);
  });

  
  let baseY = 500;
  areas.forEach((area, i) => {
    let x = width / 2;
    let y = baseY + i * 150; 

    drawFlower(x - 200, y, area.petalos, area.color, 60, -angle / 100);

    ctx.fillStyle = "#000";
    ctx.font = "bold 26px 'Times New Roman', serif";
    ctx.textAlign = "left";
    ctx.fillText(area.nombre, x - 120, y);

    ctx.font = "20px 'Times New Roman', serif";
    ctx.fillText(area.porcentaje + "% del equipo", x - 120, y + 28);
  });

  // texto abajo
  ctx.fillStyle = "#000";
  ctx.font = "18px 'Times New Roman', serif";
  ctx.textAlign = "center";
  ctx.fillText(
    "Los porcentajes reflejan cómo se distribuyó el trabajo en la película,",
    width / 2,
    height - 80
  );
  ctx.fillText(
    "indicando la cantidad de personas que participaron en cada rol.",
    width / 2,
    height - 50
  );

  angle += 1;
  requestAnimationFrame(draw);
}

// cargar data.json
fetch("data.json")
  .then(res => res.json())
  .then(data => {
    areas = data;
    draw();
  });
