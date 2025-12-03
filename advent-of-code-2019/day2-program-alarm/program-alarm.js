const add = (i, j, k, instructions) => instructions[k] = instructions[i] + instructions[j];
const mul = (i, j, k, instructions) => instructions[k] = instructions[i] * instructions[j];

export const executeInstructions = (instructions) => {
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

export const instructionsToget19690720 = () => {
  const originalInstructions = Deno.readTextFileSync('input.txt').split(',').map(x => +x);
  let i = 0;
  let j = 0;
  let instructions = [...originalInstructions];
  let result = executeInstructions(instructions);
  while (result !== 19690720 && i <= 99 && j <= 99) {
    instructions = [...originalInstructions];
    i++;
    instructions[1] = i;
    instructions[2] = j;
    if (i > 99) {
      i = 0;
      instructions[1] = i;
      instructions[2] = ++j;
    }
    result = executeInstructions(instructions);
  }
  return instructions[1] * 100 + instructions[2];
}

instructionsToget19690720()