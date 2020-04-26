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
    // we use another method of sampling!
    let count = 0;
    let maxFitness = 0;
    for (let i = 0; i < this.numberOfDataToSample; i++) {
      if (maxFitness < this.populationVal[i].fitness) {
        maxFitness = this.populationVal[i].fitness;
      }
    }

    while (true) {
      const parentIndexToSelect = floor(random(this.numberOfDataToSample));

      const prob = random(maxFitness);
      //the magic begins here!
      // we are getting any random numbers between 0 to maximum fitness right?
      // the more fitness we have the more chance it has to be selected
      // say our pool has like [10 20 30 40 50 60] as fitness
      // how do we select it?
      // 50 must have greater chance right? ..
      // so prob came like 45.. and our selected value is 10 suppose
      // is 45 < 10 is false statement.. but if we get 60 as selected value
      // then 45<60 is true.. more chance of it right?
      if (this.populationVal[parentIndexToSelect].fitness > prob) {
        return this.populationVal[parentIndexToSelect];
      }
      count++;

      if (count > 100) {
        return this.populationVal[parentIndexToSelect];
      }
    }

    // more fitness means more chance of getting selected right so let me get highest fitness first
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
    const newPopulation = [];
    for (let i = 0; i < this.numberOfDataToSample; i++) {
      let newCHILDText = this.crossover();
      let newParentFromChild = new DNA(this.target, newCHILDText);
      newParentFromChild.mutationRate = this.mutationRate;
      newParentFromChild.mutation();
      newPopulation[i] = newParentFromChild;
      if (!this.done) {
        currentText.innerText = newParentFromChild.dna.join("");
      }

      if (newParentFromChild.dna.join("") == this.target) {
        this.done = true;
      }
    }
    this.populationVal = newPopulation;
    generationNumber.innerText = this.generation;
    this.generation++;
  }
}
