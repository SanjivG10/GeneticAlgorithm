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

class DNA {
  constructor(targetWord, childGiven = null) {
    this.dna = [];
    this.fitness = 0;
    this.mutationRate = null;
    this.target = targetWord;
    if (!childGiven) {
      this.initialize();
    } else {
      this.manualInitialize(childGiven);
    }

    this.calculateFitness();
  }

  manualInitialize(childGiven) {
    for (let i = 0; i < this.target.length; i++) {
      this.dna.push(childGiven.charAt(i));
    }
  }

  initialize = () => {
    for (let i = 0; i < this.target.length; i++) {
      this.dna.push(newChar());
    }
  };

  calculateFitness = () => {
    let count = 0;
    for (let i = 0; i < this.target.length; i++) {
      if (this.dna[i] == this.target.charAt(i)) {
        count++;
      }
    }

    this.fitness = count;
  };

  mutation = () => {
    // so how does mutation work?
    // what we do is we decide how much of mutation we do.
    // which number to mutate then ?
    // mutate randomly!

    for (let i = 0; i < this.dna.length; i++) {
      if (Math.random() < this.mutationRate) {
        this.dna[i] = newChar();
      }
    }
  };
}
