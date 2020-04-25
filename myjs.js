const NO_OF_DATA_SAMPLE = 500;
const TARGET_WORD = "oh budi ma manxe nikai risalu mudi";
const MUTATION_RATE = 0.001;

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
