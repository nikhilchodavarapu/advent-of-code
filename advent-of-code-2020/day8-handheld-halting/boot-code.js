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
    // !executedInsId.includes(currentIns[0]) &&
    executedInsId.length < instructions.length
  ) {
    const [ins, arg] = instructions[currentIns].split(" ");
    executedInsId.push(currentIns[0]);
    console.log(ins, accumulator);
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
};

const main = () => {
  const instructions = Deno.readTextFileSync("input.txt").split("\r\n");
  const accumulator = [0];
  executeInstructions(instructions, accumulator);
};

main();
