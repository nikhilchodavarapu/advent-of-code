const add = (i, j, k, instructions) =>
  instructions[k] = instructions[i] + instructions[j];
const mul = (i, j, k, instructions) =>
  instructions[k] = instructions[i] * instructions[j];
// const getInput = (i, instructions) => instructions[i] = 1;
// const getInput = (i, instructions) => instructions[i] = parseInt(prompt("Enter :"));
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

export const executeInstructions = (instructions, relativeBase, input) => {
  let i = 0;
  let inputIndex = 0;
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
        // getInput(i1, instructions);
        instructions[i1] = input[inputIndex++];
        i += 2;
        break;
      case 4:
        i1 = getAddress(mode1, instructions, 1, relativeBase, i);
        // printOutput(i1, instructions);
        i += 2;
        // break;
        return instructions[i1];
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
        return instructions;
    }
  }
  return instructions;
};

const getClosestSquare = (beam) => {
  // const half = beam.length / 2;
  const closest = { l: -Infinity, b: -Infinity, pos: { x: 0, y: 0 } };
  for (let row = 0; row < beam.length; row++) {
    for (let col = 0; col < beam.length; col++) {
      if (beam[row][col] === "#") {
        let length = 0;
        let breadth = 0;
        let index = col;
        while (beam[row][index] === "#") {
          length++;
          index++;
        }
        index = row;
        let count = 0;
        if (closest.l > length) break;
        while (beam[index][col] === "#" && count <= length) {
          breadth++;
          index++;
          count++;
        }
        if (length === breadth && closest.l < length && closest.b < breadth) {
          closest.l = length;
          closest.b = breadth;
          closest.pos = { x: col, y: row };
          if (length === 100) return closest;
        }
      }
    }
  }
  return closest;
};

const main = () => {
  const originalInstructions = Deno.readTextFileSync("input.txt").split(",")
    .map((x) => +x);
  let count = 0;
  const beam = [];
  let row = [];

  const start = 198 * 9 / 2;
  for (let i = start; i < start + 300; i++) {
    for (let j = start; j < start + 300; j++) {
      const instructions = [...originalInstructions];
      if (executeInstructions(instructions, [0], [j, i])) {
        count++;
        row.push("#");
      } else row.push(".");
    }
    beam.push(row);
    row = [];
  }
  console.log(count);
  console.log(beam.map((x) => x.join("")).join("\n"));
  const closest = getClosestSquare(beam);

  console.log(closest);
  console.log((closest.pos.x + start) * 10000 + (closest.pos.y + start));
};

//10210918
//9171022
// 9181022
main();
