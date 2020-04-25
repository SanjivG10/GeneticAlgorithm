// so genetic algorithm is awesome algorithm as far as I can see it!
// the first thing we need to have population object!
// second is DNA object, onto which we have crossover, mutation thing

const userWord = document.getElementById("wordUserWantToGenerate");
const generationNumber = document.getElementById("generation");
const currentText = document.getElementById("currentText");

class Population {
  constructor(
    numberOfDataToSample,
    target,
    mutationRate,
    crossOverMode = "random"
  ) {
    this.numberOfDataToSample = numberOfDataToSample;
    this.target = target.toLowerCase();
    this.done = false;
    this.mutationRate = mutationRate;
    this.populationVal = [];
    this.crossOverMode = crossOverMode;
    this.generation = 0;
    this.initialize();
  }

  initialize = () => {
    for (let i = 0; i < this.numberOfDataToSample; i++) {
      const newTarget = new DNA(this.target);
      this.populationVal[i] = newTarget;
    }
    userWord.innerText = this.target;
  };

  getParent = () => {
    const parentPool = [];

    for (let i = 0; i < this.numberOfDataToSample; i++) {
      const n = Math.floor(this.populationVal[i].fitness * this.target.length);
      for (let j = 0; j < n; j++) {
        parentPool.push(this.populationVal[i]);
      }
    }

    const index = Math.floor(Math.random() * parentPool.length);
    return parentPool[index];
  };

  crossover = () => {
    // okay so what is crossover?
    // we take two parents of length of this.targetLength and cross over them!!
    // what we do is, we take two parents based on their fitness score!
    // we randomly select according to their probability!!
    // since javascript doesn't give us the random function with probability, what we do is create one using naive approach
    // get two parent

    let parent1 = this.getParent();
    let parent2 = this.getParent();
    const firstParent = parent1.dna.join("");
    const secondParent = parent2.dna.join("");

    let crossOverIndex = Math.floor(this.target.length / 2);
    if (this.crossOverMode == "random") {
      crossOverIndex = Math.floor(Math.random() * this.target.length);
    }

    let child =
      firstParent.substr(0, crossOverIndex) +
      secondParent.substr(crossOverIndex, this.target.length);

    return child;
  };

  generateNewParent() {
    for (let i = 0; i < this.numberOfDataToSample; i++) {
      let newCHILDText = this.crossover();
      let newParentFromChild = new DNA(this.target, newCHILDText);
      newParentFromChild.mutationRate = this.mutationRate;
      newParentFromChild.mutation();
      this.populationVal[i] = newParentFromChild;
      if (!this.done) {
        currentText.innerText = newParentFromChild.dna.join("");
      }

      if (newParentFromChild.dna.join("") == this.target) {
        this.done = true;
      }
    }
    generationNumber.innerText = this.generation;
    this.generation++;
  }
}
