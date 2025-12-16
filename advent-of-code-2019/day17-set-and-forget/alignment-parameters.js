const add = (i, j, k, instructions) =>
  instructions[k] = instructions[i] + instructions[j];
const mul = (i, j, k, instructions) =>
  instructions[k] = instructions[i] * instructions[j];
// const getInput = (i, instructions) => instructions[i] = 1;
const getInput = (i, instructions) => instructions[i] = 1;
const printOutput = (i, instructions) => console.log(instructions[i]);

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

export const getCameraOutput = (instructions, relativeBase) => {
  let i = 0;
  const cameraOutput = [];
  let line = [];
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
        getInput(i1, instructions);
        i += 2;
        break;
      case 4:
        i1 = getAddress(mode1, instructions, 1, relativeBase, i);
        // printOutput(i1, instructions);
        switch (instructions[i1]) {
          case 35:
            line.push("#");
            break;
          case 46:
            line.push(".");
            break;
          case 10:
            cameraOutput.push(line);
            line = [];
            break;
        }
        i += 2;
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
        cameraOutput.push(line);
        return cameraOutput;
    }
  }
  return instructions;
};

const locateScaffoldIntersections = (cameraOutput) => {
  const intersectionPoints = [];
  let sum = 0;
  for (let i = 0; i < cameraOutput.length; i++) {
    for (let j = 0; j < cameraOutput[i].length; j++) {
      if (cameraOutput[i][j] === "#") {
        if (
          cameraOutput[i + 1][j] === "#" && cameraOutput[i - 1] !== undefined && cameraOutput[i - 1][j] === "#" &&
          cameraOutput[i][j + 1] === "#" && cameraOutput[i][j - 1] === "#"
        ) {
          cameraOutput[i][j] = "O";
          intersectionPoints.push({ x: j, y: i });
          sum += i * j;
        }
      }
    }
  }
  console.log(sum);
};

const main = () => {
  const instructions = Deno.readTextFileSync("input.txt").split(",").map((x) =>
    +x
  );
  const input = `..#..........
..#..........
#######...###
#.#...#...#.#
#############
..#...#...#..
..#####...^..
`;
  // const cameraOutput = getCameraOutput(instructions, [0]);
  const cameraOutput = input.split("\n").map(x => x.split(""));
  locateScaffoldIntersections(cameraOutput);
  console.log(cameraOutput.map((x) => x.join("")).join("\n"));
};

main();
