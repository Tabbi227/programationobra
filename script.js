//RESPETAR EL FIGMA PORFAVOR!!!!!
//https://www.figma.com/design/JpiEBklmctotFqfmWwpXui/TP1-COMPUTACION?node-id=0-1&t=58OAllBNU5Dp0DJa-1

const agudos = []
const graves = []
const cortos = []
const largos = []

/*function preload () {
   for (let i = 0; i < 4; i++) {
    agudos[i] = loadImage(`img/Agudas/agudo${i}.png`); 
  }
  for (let i = 0; i < 3; i++) {
    graves[i] = loadImage(`img/Graves/grave${i}.png`);
  }
  for (let i = 0; i < 3; i++) {
    cortos[i] = loadImage(`img/DuracionCorta/corta${i}.png`);
  }
  for (let i = 0; i < 4; i++) {
    largos[i] = loadImage(`img/DuracionLarga/larga${i}.png`);
  }
}*/

//si cargamos en el preload se rompe
//habria que empezar a laburar con los microfonos
//para que las imagenes se carguen unicamente cuando hacemos los sonidos y que queden cargadas

function setup() {
  createCanvas(656, 1020);
  background(255);
  angleMode(DEGREES);
  noStroke();
  for (let i = 0; i < 4; i++) {
    agudos[i] = loadImage("img/Agudas/agudo" + i + ".png");
  }
  for (let i = 0; i < 3; i++) {
    graves[i] = loadImage("img/Graves/grave" + i + ".png");
  }
  for (let i = 0; i < 3; i++) {
    cortos[i] = loadImage("img/DuracionCorta/corta" + i + ".png");
  }
  for (let i = 0; i < 4; i++) {
    largos[i] = loadImage("img/DuracionLarga/larga" + i + ".png");
  }
}

function draw() {
  background(255);
  if (agudos[0]) {
    image(agudos[0], 100, 100, 200, 200);
  }
}

//SOLUCION DE GPT, PERO SIN SONIDO, PROBAR SI QUIEREN, SINO IR DIRECTO A LABURAR CON EL MIC

/*
Opción 2: Cargar imágenes en setup() y dibujar solo cuando están listas
Si querés seguir cargando en setup(), necesitás esperar a que se carguen con un callback:

js

const agudos = [];
let agudosCargados = 0;
function setup() {
  createCanvas(656, 1020);
  angleMode(DEGREES);
  noStroke();
  for (let i = 0; i < 4; i++) {
    loadImage("img/Agudas/agudo" + i + ".png", img => {
      agudos[i] = img;
      agudosCargados++;
    });
  }
}
function draw() {
  background(255);
  if (agudosCargados === 4) {
    image(agudos[0], 100, 100, 200, 200);
  } else {
    fill(0);
    textSize(24);
    text("Cargando imágenes...", 50, height / 2);
  }
}
*/
