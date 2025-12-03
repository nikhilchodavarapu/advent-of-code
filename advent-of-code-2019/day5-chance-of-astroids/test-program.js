const add = (i, j, k, instructions) =>
  instructions[k] = instructions[i] + instructions[j];
const mul = (i, j, k, instructions) =>
  instructions[k] = instructions[i] * instructions[j];
const getInput = (i, instructions) => instructions[i] = 1;
const printOutput = (i, instructions) => console.log(instructions[i]);

export const executeInstructions = (instructions) => {
  let i = 0;
  while (i < instructions.length) {
    const [mode1, mode2, mode3, ...opcodes] = (instructions[i] + "").padStart(
      5,
      "0",
    )
      .split("").map((x) => +x);
    let i1, i2, i3;
    const opcode = +opcodes.join("");
    switch (opcode) {
      case 1:
        i1 = mode1 === 0 ? instructions[i + 1] : i + 1;
        i2 = mode2 === 0 ? instructions[i + 2] : i + 2;
        i3 = false ? instructions[i + 3] : i + 3;
        add(i1, i2, i3, instructions);
        i += 4;
        break;
      case 2:
        i1 = mode1 === 0 ? instructions[i + 1] : i + 1;
        i2 = mode2 === 0 ? instructions[i + 2] : i + 2;
        i3 = false ? instructions[i + 3] : i + 3;
        mul(i1, i2, i3, instructions);
        i += 4;
        break;
      case 3:
        i1 = false ? instructions[i + 1] : i + 1;
        getInput(i1, instructions);
        i += 1;
        break;
      case 4:
        i1 = false ? instructions[i + 1] : i + 1;
        printOutput(i1, instructions);
        i += 1;
        break;
      case 99:
        return instructions;
    }
  }
  return instructions;
};

const main = () => {
  const instructions = Deno.readTextFileSync("input.txt").split(",").map((x) =>
    +x
  );
  executeInstructions(instructions);
};

main();
