import { permutations } from "jsr:@std/collections";

const add = (i, j, k, instructions) =>
  instructions[k] = instructions[i] + instructions[j];
const mul = (i, j, k, instructions) =>
  instructions[k] = instructions[i] * instructions[j];
// const getInput = (i, instructions) => instructions[i] = 1;
const getInput = (i, instructions, input) => instructions[i] = input;

const printOutput = (i, instructions) => instructions[i];

export const executeInstructions = (instructions, validInputs, index, prevOutput) => {
  let isOutputUsed = false;
  let output = prevOutput;
  let i = index;
  while (i < instructions.length) {
    // console.log("instruction => ", instructions[i], i);
    const [mode3, mode2, mode1, ...opcodes] = (instructions[i] + "").padStart(
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
        i3 = mode3 === 0 ? instructions[i + 3] : i + 3;
        add(i1, i2, i3, instructions);
        i += 4;
        break;
      case 2:
        i1 = mode1 === 0 ? instructions[i + 1] : i + 1;
        i2 = mode2 === 0 ? instructions[i + 2] : i + 2;
        i3 = mode3 === 0 ? instructions[i + 3] : i + 3;
        mul(i1, i2, i3, instructions);
        i += 4;
        break;
      case 3:
        i1 = mode1 === 0 ? instructions[i + 1] : i + 1;
        isOutputUsed
          ? getInput(i1, instructions, validInputs[1])
          : getInput(i1, instructions, validInputs[0]);
        isOutputUsed = !isOutputUsed;
        i += 2;
        break;
      case 4:
        i1 = mode1 === 0 ? instructions[i + 1] : i + 1;
        output = printOutput(i1, instructions);
        return [output, i + 2];
      case 5:
        i1 = mode1 === 0 ? instructions[i + 1] : i + 1;
        i2 = mode2 === 0 ? instructions[i + 2] : i + 2;
        i = instructions[i1] !== 0 ? instructions[i2] : i + 3;
        break;
      case 6:
        i1 = mode1 === 0 ? instructions[i + 1] : i + 1;
        i2 = mode2 === 0 ? instructions[i + 2] : i + 2;
        i = instructions[i1] === 0 ? instructions[i2] : i + 3;
        break;
      case 7:
        i1 = mode1 === 0 ? instructions[i + 1] : i + 1;
        i2 = mode2 === 0 ? instructions[i + 2] : i + 2;
        i3 = mode3 === 0 ? instructions[i + 3] : i + 3;
        instructions[i3] = instructions[i1] < instructions[i2] ? 1 : 0;
        i += 4;
        break;
      case 8:
        i1 = mode1 === 0 ? instructions[i + 1] : i + 1;
        i2 = mode2 === 0 ? instructions[i + 2] : i + 2;
        i3 = mode3 === 0 ? instructions[i + 3] : i + 3;
        instructions[i3] = instructions[i1] === instructions[i2] ? 1 : 0;
        i += 4;
        break;
      case 99:
        return [output, 99];
    }
  }
  return [output];
};

const getHighestSignal = (originalInstructions) => {
  // const sequences = permutations([0, 1, 2, 3, 4]);
  const sequences = permutations([5, 6, 7, 8, 9]);
  const outputs = [];
  sequences.forEach((seq) => {
    let i = 0;
    let output = [0];
    const halted = [1, 1, 1, 1, 1];
    const indexes = [0, 0, 0, 0, 0];
    const prevOutputs = [0, 0, 0, 0, 0]
    const instructions = Array.from({length : 5}, _ => [...originalInstructions]);
    console.log(seq);
    while (halted.includes(1)) {
      if (halted[i] === 1) {
        const validInputs = [seq[i], output[0]];
        output = executeInstructions(instructions[i], validInputs, indexes[i], prevOutputs[i]);
        prevOutputs[i] = output[0];
        if (output[1] === 99) {
          halted[i] = 0;
          console.log(output);
        }
        else indexes[i] = output[1];
      }
      i = ++i % 5;
    }
    outputs.push(output[0]);
  });
  return Math.max(...outputs);
};

const main = () => {
  const instructions = Deno.readTextFileSync("input.txt").split(",").map((x) =>
    +x
  );
  const highest = getHighestSignal(instructions);
  console.log(highest);
};

main();
