let audioContext, mic, pitch;
let gestorI, gestorPitch;
let antesHabiaSonido = false;
let tiempoInicioSonido = 0;

let imagenActual = null;
let mostrarImagen = false;

let minimoI = 0; //el valor mínimo de intensidad (volumen) del miccc
let maximoI = 0.3; //valor máximo de intensidad (volumen) 
let minNota = 20; // valor mínimo de nota MIDI q se usa para el filtro pitch
let maxNota = 100; //
let umbral = 0.1; //
let corteNotaGrave = 45;

let indiceGraveSecuencia = 0; // para mostrar figuras graves en orden
let indiceAgudoSecuencia = 0; //para mostrar figuras agudas

const agudos = [];
const graves = [];
const cortos = [];
const largos = [];


function preload() {
  for (let i = 0; i < 3; i++) {
    graves[i] = loadImage("img/Graves/grave" + i + ".png");
  }
  for (let i = 0; i < 4; i++) {
    agudos[i] = loadImage("img/Agudas/agudo" + i + ".png");
  }
}


function setup() {
  createCanvas(656, 1020);
  background(255);
  angleMode(DEGREES);
  noStroke();

  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);
  userStartAudio();

  gestorI = new GestorSenial(minimoI, maximoI);
  gestorPitch = new GestorSenial(minNota, maxNota);
}


function draw() {

  let intensidad = mic.getLevel();
  gestorI.actualizar(intensidad);

  let haySonido = gestorI.filtrada > umbral;
  let empezoElSonido = !antesHabiaSonido && haySonido;
  let terminoElSonido = antesHabiaSonido && !haySonido;

  if (empezoElSonido) {
    tiempoInicioSonido = millis();
  }

  if (terminoElSonido) {
    let duracion = millis() - tiempoInicioSonido;
    let nota = gestorPitch.filtrada;
    console.log("Nota MIDI detectada:", nota);

    let esGrave = nota < corteNotaGrave;

    if (esGrave) {
      imagenActual = graves[indiceGraveSecuencia];
      indiceGraveSecuencia = (indiceGraveSecuencia + 1) % graves.length;
      mostrarImagen = true;
    } else {
      imagenActual = agudos[indiceAgudoSecuencia];
      indiceAgudoSecuencia = (indiceAgudoSecuencia + 1) % agudos.length;
      mostrarImagen = true;
    }
  }

  if (mostrarImagen && imagenActual) {
    image(imagenActual, 0, 0);
  }
  /*
    let esGrave = nota < 60;
      if (esGrave) {
        imagenActual = graves[indiceGraveSecuencia];
        indiceGraveSecuencia = (indiceGraveSecuencia + 1) % graves.length;
        mostrarImagen = true;
        // muestra y almacena cada imagen en pos vertical
        let y = indiceGraveSecuencia; 
        image(imagenActual, 0, 0);
      }
    }
  */
  antesHabiaSonido = haySonido;
}
function startPitch() {
  let model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/';
   pitch = ml5.pitchDetection(model_url, audioContext, mic.stream, modelLoaded);
}
function modelLoaded() {
  console.log("Modelo cargado con éxito");
  getPitch();
}
function getPitch() {
  pitch.getPitch(function (err, frequency) {
    if (frequency) {
      let midiNote = freqToMidi(frequency);
      gestorPitch.actualizar(midiNote);
    }
    getPitch();
  });
}

function freqToMidi(frequency) {
  return 69 + 12 * Math.log2(frequency / 440);
}



