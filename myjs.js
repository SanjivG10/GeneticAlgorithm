const NO_OF_DATA_SAMPLE = 200;
const TARGET_WORD = "Malai deep learning aaudaina";
const MUTATION_RATE = 0.01;

const myPopulation = new Population(
  NO_OF_DATA_SAMPLE,
  TARGET_WORD,
  MUTATION_RATE
);

let finished = false;
function setup() {}

function draw() {
  myPopulation.generateNewParent();
  if (myPopulation.done) {
    noLoop();
  }
}
