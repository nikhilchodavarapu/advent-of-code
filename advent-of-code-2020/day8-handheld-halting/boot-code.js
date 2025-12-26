const executeInstructions = (instructions, accumulator) => {
  const runIns = {
    jmp: (nextIns) => currentIns[0] += nextIns,
    acc: (increment) => {
      accumulator[0] += increment;
      currentIns[0] += 1;
    },
    nop: () => currentIns[0] += 1,
  };

  const executedInsId = [];
  const currentIns = [0];
  while (
    !executedInsId.includes(currentIns[0]) &&
    currentIns[0] < instructions.length
  ) {
    const [ins, arg] = instructions[currentIns[0]].split(" ");
    executedInsId.push(currentIns[0]);
    // console.log(ins, accumulator);
    runIns[ins](+arg);
    if (executedInsId.includes(currentIns[0])) {
      let correctIns = "";
      if (ins === "jmp") {
        runIns[ins](-(+arg));
        correctIns = "nop";
      } else {
        runIns.jmp(-1);
        correctIns = "jmp";
      }
      runIns[correctIns](+arg);
      executedInsId.pop();
      executedInsId.push(currentIns[0]);
    }
  }
  console.log(accumulator);
  return currentIns[0] >= instructions.length;
};

const main = () => {
  const instructions = Deno.readTextFileSync("input.txt").split("\n");
  const insList = {};
  for (let i = 0; i < instructions.length; i++) {
    const [ins, arg] = instructions[i].split(" ");
    if (ins === "jmp" || ins === "nop") {
      insList[i] = (ins === "jmp" ? "nop" : "jmp") + " " + arg;
    }
  }
  const accumulator = [0];
  let modifiedIns = [...instructions];
  const keys = Object.keys(insList);
  let i = 0;
  let key = keys[i];
  let isFullyCompleted = false;
  while (!isFullyCompleted) {
    accumulator[0] = 0;
    modifiedIns[+key] = insList[key];
    isFullyCompleted = executeInstructions(modifiedIns, accumulator);
    i++;
    key = keys[i];
    modifiedIns = [...instructions];
    console.log(isFullyCompleted);
  }
};

main();
