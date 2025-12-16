const freq = [0, 1, 0, -1];

const runAPhase = (signal) => {
  const nextPhase = [];
  for (let i = 0; i < signal.length; i++) {
    let freqIndex = 1;
    let sum = 0;
    const currentFreq = freq.flatMap(x => {
      const repeated = [];
      for (let j = 0; j < i + 1; j++) {
        repeated.push(x);
      }
      return repeated;
    })
    for (let j = 0; j < signal.length; j++) {
      sum += (currentFreq[freqIndex] * signal[j]) % 10;
      freqIndex = ++freqIndex % currentFreq.length;
    }
    nextPhase.push(Math.abs(sum % 10));
  }
  return nextPhase;
};

const getFinalOutput = (signal, phases) => {
  let currentPhase = signal;
  for (let i = 0; i < phases; i++) {
    currentPhase = runAPhase(currentPhase);
  }
  return currentPhase.slice(0, 8).join("");
}

const main = () => {
  const inputSignal = Deno.readTextFileSync("input.txt").split("").map(x => +x);
  console.log(getFinalOutput(inputSignal, 100));
}

main()