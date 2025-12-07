import { distinctBy } from "jsr:@std/collections";

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

export const executeInstructions = (instructions, index, color, relativeBase) => {
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
    // console.log(opcode, i)
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
        // getInput(i1, instructions);
        instructions[i1] = color;
        i += 2;
        break;
      case 4:
        i1 = getAddress(mode1, instructions, 1, relativeBase, i);
        outputs.push(instructions[i1]);
        i += 2;
        if (outputs.length === 2) return [outputs, i];
        break;
      case 5:
        i1 = getAddress(mode1, instructions, 1, relativeBase, i);
        i2 = getAddress(mode2, instructions, 2, relativeBase, i);
        // console.log(instructions[i1]);
        i = instructions[i1] !== 0 ? instructions[i2] : i + 3;
        break;
      case 6:
        i1 = getAddress(mode1, instructions, 1, relativeBase, i);
        i2 = getAddress(mode2, instructions, 2, relativeBase, i);
        i = instructions[i1] === 0 ? instructions[i2] : i + 3;
        // console.log(i, i2);
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
        // console.log(relativeBase)
        i += 2;
        break;
      case 99:
        return [99];
    }
  }
  console.log(index);
  return [outputs, i];
};

const compass = {
  N: { 0: "W", 1: "E", offset: [0, 1] },
  E: { 0: "N", 1: "S", offset: [1, 0] },
  S: { 0: "E", 1: "W", offset: [0, -1] },
  W: { 0: "S", 1: "N", offset: [-1, 0] },
};

const paintPanel = (instructions) => {
  let turnOrpaint = true;
  let currentDirection = "N";
  const paintedLoc = [{ x: 0, y: 10, color: 1 }];
  const positionOfRobot = { x: 0, y: 10 };
  const panel = Array.from(
    { length: 50 },
    (_) => Array.from({ length: 50 }, (_) => " "),
  );
  // let ouput = executeInstructions(instructions, 0, 0);
  const relativeBase = [0]
  let ouput = executeInstructions(instructions, 0, 1, relativeBase);
  while (ouput.length !== 1) {
    paintedLoc.push({ ...positionOfRobot, color: ouput[0][0] });
    panel[positionOfRobot.x] = panel[positionOfRobot.x] || [];
    panel[positionOfRobot.x][positionOfRobot.y] = ouput[0][0] === 0 ? "." : "#";
    currentDirection = compass[currentDirection][ouput[0][1]];
    const [i, j] = compass[currentDirection].offset;
    positionOfRobot.x += i;
    positionOfRobot.y += j;
    // if (turnOrpaint) paintedLoc.push({ ...positionOfRobot, color: ouput[0] });
    // else {
    //   currentDirection = compass[currentDirection][ouput[0]];
    //   const [i, j] = compass[currentDirection].offset;
    //   positionOfRobot.x += i;
    //   positionOfRobot.y += j;
    // }
    const currentPosition = paintedLoc.filter((pos) =>
      pos.x === positionOfRobot.x && pos.y === positionOfRobot.y
    ).at(-1);
    const color = currentPosition ? currentPosition.color : 0;
    ouput = executeInstructions(instructions, ouput[1], color, relativeBase);
    // console.log(ouput);
    turnOrpaint = !turnOrpaint;
    // console.log(ouput)
    // console.log(positionOfRobot, paintedLoc);
  }
  // console.log(distinctBy(paintedLoc, pos => pos.x + "" + pos.y).length);
  const result = paintedLoc.reduce(
    (unique, point) => unique[`${point.x},${point.y}`] = true && unique,
    {},
  );
  console.log(Object.keys(result).length);
  console.log(panel.map((x) => x.join("")).join("\n"));
  // console.log(ouput.length, paintedLoc.length);
};

const main = () => {
  const instructions = Deno.readTextFileSync("input.txt").split(",").map((x) =>
    +x
  );
  // executeInstructions(instructions);
  paintPanel(instructions);
};

main();
