const add = (i, j, k, instructions) =>
  instructions[k] = instructions[i] + instructions[j];
const mul = (i, j, k, instructions) =>
  instructions[k] = instructions[i] * instructions[j];
// const getInput = (i, instructions) => instructions[i] = 1;
const getInput = (i, instructions) => instructions[i] = 1;
const printOutput = (i, instructions) => console.log(instructions[i]);

const getAddress = (mode, instructions, modeNum, relativeBase, indexes, i) => {
  switch (mode) {
    case 0:
      return instructions[indexes[i] + modeNum];
    case 1:
      return indexes[i] + modeNum;
    case 2:
      return relativeBase[i] + instructions[indexes[i] + modeNum];
  }
};

export const executeInstructions = (
  instructions,
  relativeBase,
  inputs,
  indexes,
  currentComputer,
) => {
  // let indexes[currentComputer] = 0;
  let currentInput = -100;
  const outputs = [];
  while (indexes[currentComputer] < instructions[currentComputer].length) {
    const [mode3, mode2, mode1, ...opcodes] =
      (instructions[currentComputer][indexes[currentComputer]] + "").padStart(
        5,
        "0",
      )
        .split("").map((x) => +x);
    let i1, i2, i3;
    const opcode = +opcodes.join("");
    switch (opcode) {
      case 1:
        i1 = getAddress(
          mode1,
          instructions[currentComputer],
          1,
          relativeBase,
          indexes,
          currentComputer,
        );
        i2 = getAddress(
          mode2,
          instructions[currentComputer],
          2,
          relativeBase,
          indexes,
          currentComputer,
        );
        i3 = getAddress(
          mode3,
          instructions[currentComputer],
          3,
          relativeBase,
          indexes,
          currentComputer,
        );
        add(i1, i2, i3, instructions[currentComputer]);
        indexes[currentComputer] += 4;
        break;
      case 2:
        i1 = getAddress(
          mode1,
          instructions[currentComputer],
          1,
          relativeBase,
          indexes,
          currentComputer,
        );
        i2 = getAddress(
          mode2,
          instructions[currentComputer],
          2,
          relativeBase,
          indexes,
          currentComputer,
        );
        i3 = getAddress(
          mode3,
          instructions[currentComputer],
          3,
          relativeBase,
          indexes,
          currentComputer,
        );
        mul(i1, i2, i3, instructions[currentComputer]);
        indexes[currentComputer] += 4;
        break;
      case 3:
        i1 = getAddress(
          mode1,
          instructions[currentComputer],
          1,
          relativeBase,
          indexes,
          currentComputer,
        );
        // getInput(i1, instructions);
        // console.log(input);
        currentInput = inputs[currentComputer].shift();
        instructions[currentComputer][i1] = currentInput === undefined
          ? -1
          : currentInput;
        // if (instructions[i1] !== -1) console.log(instructions[i1]);
        indexes[currentComputer] += 2;
        return currentInput === undefined ? -1 : 100;
      case 4:
        i1 = getAddress(
          mode1,
          instructions[currentComputer],
          1,
          relativeBase,
          indexes,
          currentComputer,
        );
        printOutput(i1, instructions[currentComputer]);
        // inputs[currentComputer].push(instructions[currentComputer][i1]);
        indexes[currentComputer] += 2;
        outputs.push(instructions[currentComputer][i1]);
        if (outputs.length === 3) return outputs;
        break;
      case 5:
        i1 = getAddress(
          mode1,
          instructions[currentComputer],
          1,
          relativeBase,
          indexes,
          currentComputer,
        );
        i2 = getAddress(
          mode2,
          instructions[currentComputer],
          2,
          relativeBase,
          indexes,
          currentComputer,
        );
        indexes[currentComputer] = instructions[currentComputer][i1] !== 0
          ? instructions[currentComputer][i2]
          : indexes[currentComputer] + 3;
        break;
      case 6:
        i1 = getAddress(
          mode1,
          instructions[currentComputer],
          1,
          relativeBase,
          indexes,
          currentComputer,
        );
        i2 = getAddress(
          mode2,
          instructions[currentComputer],
          2,
          relativeBase,
          indexes,
          currentComputer,
        );
        indexes[currentComputer] = instructions[currentComputer][i1] === 0
          ? instructions[currentComputer][i2]
          : indexes[currentComputer] + 3;
        break;
      case 7:
        i1 = getAddress(
          mode1,
          instructions[currentComputer],
          1,
          relativeBase,
          indexes,
          currentComputer,
        );
        i2 = getAddress(
          mode2,
          instructions[currentComputer],
          2,
          relativeBase,
          indexes,
          currentComputer,
        );
        i3 = getAddress(
          mode3,
          instructions[currentComputer],
          3,
          relativeBase,
          indexes,
          currentComputer,
        );
        instructions[currentComputer][i3] =
          instructions[currentComputer][i1] < instructions[currentComputer][i2]
            ? 1
            : 0;
        indexes[currentComputer] += 4;
        break;
      case 8:
        i1 = getAddress(
          mode1,
          instructions[currentComputer],
          1,
          relativeBase,
          indexes,
          currentComputer,
        );
        i2 = getAddress(
          mode2,
          instructions[currentComputer],
          2,
          relativeBase,
          indexes,
          currentComputer,
        );
        i3 = getAddress(
          mode3,
          instructions[currentComputer],
          3,
          relativeBase,
          indexes,
          currentComputer,
        );
        instructions[currentComputer][i3] =
          instructions[currentComputer][i1] ===
              instructions[currentComputer][i2]
            ? 1
            : 0;
        indexes[currentComputer] += 4;
        break;
      case 9:
        i1 = getAddress(
          mode1,
          instructions[currentComputer],
          1,
          relativeBase,
          indexes,
          currentComputer,
        );
        relativeBase[currentComputer] += instructions[currentComputer][i1];
        indexes[currentComputer] += 2;
        break;
      case 99:
        return 99;
    }
  }
  return instructions[currentComputer];
};

const main = () => {
  const instructions = Deno.readTextFileSync("input.txt").split(",").map((x) =>
    +x
  );
  const isHalted = Array.from({ length: 50 }, (_) => 100);
  let i = 0;
  const inputs = Array.from({ length: 50 }, (_) => [i++]);
  const outputs = Array.from({ length: 50 }, (_) => 0);
  const indexes = Array.from({ length: 50 }, (_) => 0);
  const relativeBases = Array.from({ length: 50 }, (_) => 0);
  const instructionsList = Array.from({ length: 50 }, (_) => [...instructions]);
  const NAT = {};
  let lastY = -100;
  console.log(inputs);
  i = 0;
  while (!isHalted.includes(99)) {
    // console.log(i);
    if (
      i === 0 && outputs.every(x => x === -1)
    ) {
      console.log(NAT.y);
      if (lastY === NAT.y) break;
      inputs[0].push(NAT.x, NAT.y);
    } 
    const output = executeInstructions(
      instructionsList,
      relativeBases,
      inputs,
      indexes,
      i,
    );
    outputs[i] = output;
    // if (output !== 100) console.log(output, i);
    if (typeof output === "object") {
      outputs[i] = output[0];
      if (output[0] === 255) {
        lastY = NAT.y;
        NAT.x = output[1];
        NAT.y = output[2];
        console.log(output)
      } else {
        inputs[output[0]].push(output[1], output[2]);
      }
    } else isHalted[i] = output;
    // console.log(i);
    i = ++i % 50;
  }
};

main();
