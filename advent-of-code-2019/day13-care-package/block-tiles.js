const add = (i, j, k, instructions) =>
  instructions[k] = instructions[i] + instructions[j];
const mul = (i, j, k, instructions) =>
  instructions[k] = instructions[i] * instructions[j];
// const getInput = (i, instructions) => instructions[i] = 1;
// const getInput = (i, instructions) => instructions[i] = 2;
// const printOutput = (i, instructions) => console.log(instructions[i]);

const getAddress = (mode, instructions, modeNum, relativeBase, i) => {
  switch (mode) {
    case 0:
      return instructions[i + modeNum];
    case 1:
      return i + modeNum;
    case 2:
      return relativeBase[0] + instructions[i + modeNum];
  }
};

export const executeInstructions = (
  instructions,
  index,
  relativeBase,
  input,
) => {
  let i = index;
  const outputs = [];
  while (i < instructions.length) {
    const [mode3, mode2, mode1, ...opcodes] = (instructions[i] + "").padStart(
      5,
      "0",
    )
      .split("").map((x) => +x);
    let i1, i2, i3;
    const opcode = +opcodes.join("");
    switch (opcode) {
      case 1:
        i1 = getAddress(mode1, instructions, 1, relativeBase, i);
        i2 = getAddress(mode2, instructions, 2, relativeBase, i);
        i3 = getAddress(mode3, instructions, 3, relativeBase, i);
        add(i1, i2, i3, instructions);
        i += 4;
        break;
      case 2:
        i1 = getAddress(mode1, instructions, 1, relativeBase, i);
        i2 = getAddress(mode2, instructions, 2, relativeBase, i);
        i3 = getAddress(mode3, instructions, 3, relativeBase, i);
        mul(i1, i2, i3, instructions);
        i += 4;
        break;
      case 3:
        i1 = getAddress(mode1, instructions, 1, relativeBase, i);
        // getInput(i1, instructions, tiles);
        instructions[i1] = input
        i += 2;
        break;
      case 4:
        i1 = getAddress(mode1, instructions, 1, relativeBase, i);
        // printOutput(i1, instructions);
        outputs.push(instructions[i1]);
        i += 2;
        if (outputs.length === 3) return [outputs, i];
        break;
      case 5:
        i1 = getAddress(mode1, instructions, 1, relativeBase, i);
        i2 = getAddress(mode2, instructions, 2, relativeBase, i);
        i = instructions[i1] !== 0 ? instructions[i2] : i + 3;
        break;
      case 6:
        i1 = getAddress(mode1, instructions, 1, relativeBase, i);
        i2 = getAddress(mode2, instructions, 2, relativeBase, i);
        i = instructions[i1] === 0 ? instructions[i2] : i + 3;
        break;
      case 7:
        i1 = getAddress(mode1, instructions, 1, relativeBase, i);
        i2 = getAddress(mode2, instructions, 2, relativeBase, i);
        i3 = getAddress(mode3, instructions, 3, relativeBase, i);
        instructions[i3] = instructions[i1] < instructions[i2] ? 1 : 0;
        i += 4;
        break;
      case 8:
        i1 = getAddress(mode1, instructions, 1, relativeBase, i);
        i2 = getAddress(mode2, instructions, 2, relativeBase, i);
        i3 = getAddress(mode3, instructions, 3, relativeBase, i);
        instructions[i3] = instructions[i1] === instructions[i2] ? 1 : 0;
        i += 4;
        break;
      case 9:
        i1 = getAddress(mode1, instructions, 1, relativeBase, i);
        relativeBase[0] += instructions[i1];
        i += 2;
        break;
      case 99:
        return [99];
    }
  }
  return outputs;
};

const startGame = (instructions) => {
  const tiles = Array.from(
    { length: 50 },
    (_) => Array.from({ length: 50 }, (_) => " "),
  );
  const relativeBase = [0];
  let outputs = executeInstructions(instructions, 0, relativeBase, tiles);
  let ball = 0;
  let paddle = 0;
  let score = 0;
  while (outputs.length !== 1) {
    const [[x, y, id], index] = outputs;
    tiles[y][x] = id;
    if (id === 4) ball = x
    if (id === 3) paddle = x
    if (x === -1 && y === 0) score = id;
    outputs = executeInstructions(instructions, index, relativeBase, Math.sign(ball - paddle));
  }
  console.log(score);
  // console.log(tiles.map((x) => x.join("")).join("\n"));
  // console.log(
  //   tiles.reduce((count, x) =>
  //     count + x.reduce((count2, n) =>
  //       n === 2 ? count2 + 1 : count2
  //     , 0), 0),
  // );
  // console.log(count);
};

const main = () => {
  const instructions = Deno.readTextFileSync("input.txt").split(",").map((x) =>
    +x
  );
  startGame(instructions);
};

main();
