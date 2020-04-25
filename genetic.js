// so genetic algorithm is awesome algorithm as far as I can see it!
// the first thing we need to have population object!
// second is DNA object, onto which we have crossover, mutation thing

const wordUSERWANTTOGENERATE = document.getElementById(
  "wordUserWantToGenerate"
);
const generationNumber = document.getElementById("generation");
const currentText = document.getElementById("currentText");

const calculateFitness = (str1, str2) => {
  let count = 0;
  for (let i = 0; i < str1.length; i++) {
    if (str1.charAt(i) == str2.charAt(i)) {
      count++;
    }
  }
  return count / str1.length;
};

const newChar = () => {
  const array = generateSupportedIndices();
  const index = Math.floor(Math.random() * array.length);
  const theRandomIndex = array[index];
  return String.fromCharCode(theRandomIndex);
};

const generateSupportedIndices = () => {
  const letterAstartingIndex = 97;
  const letterZstartingIndex = 122;
  const spaceIndex = 32;

  const myArrayIndices = [];
  for (let i = letterAstartingIndex; i <= letterZstartingIndex; i++) {
    myArrayIndices.push(i);
  }
  myArrayIndices.push(spaceIndex);
  return myArrayIndices;
};

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
    this.eachPopulationFitness = [];
    this.crossOverMode = crossOverMode;
    this.generation = 0;
    this.initialize();
  }

  initialize = () => {
    for (let i = 0; i < this.numberOfDataToSample; i++) {
      this.populationVal[i] = new DNA(this.target.length);
    }
    this.generateFitness();
    wordUSERWANTTOGENERATE.innerText = this.target;
  };

  generateFitness = () => {
    let sumFitness = 0;

    for (let i = 0; i < this.numberOfDataToSample; i++) {
      const currentFitness = calculateFitness(
        this.populationVal[i].dna.join(""),
        this.target
      );
      this.eachPopulationFitness[i] = currentFitness;
      sumFitness += currentFitness;
    }

    for (let i = 0; i < this.numberOfDataToSample; i++) {
      this.eachPopulationFitness[i] =
        this.eachPopulationFitness[i] / sumFitness;
    }

    // okay the fitness is calculated but would be easy if I normalize it to contain probability!
  };

  getRandomParent = (weights, results) => {
    // we have weights and results! we have to return results according to the weights!
    // generate pool of letters and then get the values!
    const myPool = [];

    for (let i = 0; i < weights.length; i++) {
      const NofTimesEachVal = Math.floor(weights[i] * weights.length);

      for (let j = 0; j < NofTimesEachVal; j++) {
        myPool.push(results[i]);
      }
    }

    const idx = Math.floor(Math.random() * myPool.length);
    return myPool[idx];
  };

  crossover = () => {
    // okay so what is crossover?
    // we take two parents of length of this.targetLength and cross over them!!
    // what we do is, we take two parents based on their fitness score!
    // we randomly select according to their probability!!
    // since javascript doesn't give us the random function with probability, what we do is create one using naive approach
    // get two parent
    let parent1 = this.getRandomParent(
      this.eachPopulationFitness,
      this.populationVal
    );

    let parent2 = this.getRandomParent(
      this.eachPopulationFitness,
      this.populationVal
    );

    // the parent we get is in the Population object. I want string from it.
    const firstParent = parent1.dna.join(""); //consists array of chars !
    const secondParent = parent2.dna.join("");
    // now we crossover!!! But at which point?
    let crossOverIndex = Math.floor(this.target.length / 2);

    if (this.crossOverMode == "random") {
      crossOverIndex = Math.floor(Math.random() * this.target.length);
    }

    let child =
      firstParent.substr(0, crossOverIndex) +
      secondParent.substr(crossOverIndex, this.target.length);
    //mutate child here in crossover. don't do lyang lyang
    return child;
  };

  generateNewParent() {
    for (let i = 0; i < this.numberOfDataToSample; i++) {
      let newCHILD = this.crossover();
      newCHILD = this.mutation(newCHILD);
      this.populationVal[i] = new DNA(newCHILD.length, newCHILD);

      if (!this.done) {
        currentText.innerText = newCHILD;
      }

      if (newCHILD == this.target) {
        this.done = true;
      }
    }

    this.generateFitness();

    generationNumber.innerText = this.generation;
    this.generation++;
  }

  // what is left now is mutation!
  mutation = (child) => {
    // so how does mutation work?
    // what we do is we decide how much of mutation we do.
    // which number to mutate then ?
    // mutate randomly!
    const mutateThisManyCharacters = Math.ceil(
      this.mutationRate * this.target.length
    );

    for (let i = 0; i < mutateThisManyCharacters; i++) {
      const mutationLength = Math.floor(Math.random() * this.target.length);
      child = child.split("");
      child[mutationLength] = newChar();
      child = child.join("");
    }
    return child;
  };
}

//dna  is an array of letterse

class DNA {
  constructor(length, givenString = null) {
    this.dna = [];
    this.targetLength = length;
    if (givenString) {
      for (let i = 0; i < givenString.length; i++) {
        this.dna.push(givenString.charAt(i));
      }
    } else {
      this.initialize(length);
    }
  }

  initialize = (lengthOFWord) => {
    for (let i = 0; i < lengthOFWord; i++) {
      this.dna.push(newChar());
    }
  };
}
