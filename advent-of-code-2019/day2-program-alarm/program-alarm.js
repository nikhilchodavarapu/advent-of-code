const add = (i, j, k, instructions) => instructions[k] = instructions[i] + instructions[j];
const mul = (i, j, k, instructions) => instructions[k] = instructions[i] * instructions[j];

const executeInstructions = (instructions) => {
  let i = 0;
  while (i < instructions.length) {
    if (instructions[i] === 1) {
      add(instructions[i+1], instructions[i+2], instructions[i+3], instructions);
    } else if (instructions[i] === 2) {
      mul(instructions[i+1], instructions[i+2], instructions[i+3], instructions);
    } else if (instructions[i] === 99) {
      return instructions[0];
    }
    i += 4;
  }
  return instructions[0];
}