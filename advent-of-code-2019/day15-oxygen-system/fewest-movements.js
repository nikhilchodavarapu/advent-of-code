const movements = {
  1: [0, -1],
  2: [0, 1],
  3: [1, 0],
  4: [-1, 0],
};

const add = (i, j, k, instructions) =>
  instructions[k] = instructions[i] + instructions[j];
const mul = (i, j, k, instructions) =>
  instructions[k] = instructions[i] * instructions[j];
// const getInput = (i, instructions) => instructions[i] = 1;
const getInput = (i, instructions, area, droidPosition) => {
  for (let j = 0; j < 10000000; j++);
  console.clear();
  for (let x = 1; x <= 4; x++) {
    const [xi, yi] = movements[x];
    if (
      area[droidPosition.y + yi][droidPosition.x + xi] !== "#" &&
      area[droidPosition.y + yi][droidPosition.x + xi] !== "." &&
      area[droidPosition.y + yi][droidPosition.x + xi] !== "-"
    ) return instructions[i] = x;
  }

  for (let x = 1; x <= 4; x++) {
    const [xi, yi] = movements[x];
    if (
      area[droidPosition.y + yi][droidPosition.x + xi] !== "#" &&
      area[droidPosition.y + yi][droidPosition.x + xi] !== "-"
    ) {
      area[droidPosition.y][droidPosition.x] = "-";
      return instructions[i] = x;
    }
  }
  // let x = parseInt(prompt("Enter Movement Command : "));
  // while (![1, 2, 3, 4].includes(x)) {
  //   console.log("Invalid Input! Retry")
  //   x = parseInt(prompt("Enter Movement Command : "));
  // }
};
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

export const executeInstructions = (
  instructions,
  relativeBase,
  index,
  [area, droidPosition],
) => {
  let i = index;
  let input = 0;
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
        input = getInput(i1, instructions, area, droidPosition);
        i += 2;
        break;
      case 4:
        i1 = getAddress(mode1, instructions, 1, relativeBase, i);
        printOutput(i1, instructions);
        i += 2;
        return [instructions[i1], input, index];
        // break;
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

const findShortestPath = (startPosition, droidPosition, area) => {
  let steps = 1;
  let minutes = 1;
  while (
    !(droidPosition.x === startPosition.x &&
      droidPosition.y === startPosition.y)
  ) {
    // for (let j = 0; j < 100000000; j++);
    // console.clear();
    for (let x = 1; x <= 4; x++) {
      const [xi, yi] = movements[x];
      if (
        area[droidPosition.y + yi][droidPosition.x + xi] === "."
      ) {
        minutes += yi !== 0 ? 1 : 0;
        area[droidPosition.y][droidPosition.x] = "#";
        droidPosition.y += yi;
        droidPosition.x += xi;
        area[droidPosition.y][droidPosition.x] = "D";
        steps++;
        break;
      }
    }
    console.log(area.map((x) => x.join("")).join("\n"));
  }
  return [steps, minutes];
};

const findMaxMinutes = (oxygenSystem, area) => {
  let minutes = 1;
  const oxygenSystems = [{ ...oxygenSystem }];
  let count = 1;
  while (count !== 0) {
    count = 0;
    for (let j = 0; j < 100000000; j++);
    console.clear();
    console.log(area.map((x) => x.join("")).join("\n"));
    // console.log(oxygenSystems);
    const osLength = oxygenSystems.length;
    for (let i = 0; i < osLength; i++) {
      const pos = oxygenSystems[i];
      for (let x = 1; x <= 4; x++) {
        const [xi, yi] = movements[x];
        if (
          area[pos.y + yi][pos.x + xi] === "." ||
          area[pos.y + yi][pos.x + xi] === "-"
        ) {
          count++;
          area[pos.y + yi][pos.x + xi] = "O";
          oxygenSystems.push({ x: pos.x + xi, y: pos.y + yi });
        }
      }
    }
    if (count !== 0) minutes++;
  }
  return minutes;
};

const findPath = (instructions) => {
  const area = Array.from(
    { length: 100 },
    (_) => Array.from({ length: 100 }, (_) => " "),
  );
  const relativeBase = [0];
  const startPosition = { x: 50, y: 50 };
  const droidPosition = { x: 50, y: 50 };
  let reply = executeInstructions(instructions, relativeBase, 0, [
    area,
    droidPosition,
  ]);
  area[droidPosition.y][droidPosition.x] = "D";
  while (reply[0] !== 2) {
    console.log(reply[1]);
    if (reply[1] === undefined) {
      console.log(area.map((x) => x.join("")).join("\n"));
    }
    const [xi, yi] = movements[reply[1]];
    if (reply[0] === 0) {
      area[droidPosition.y + yi][droidPosition.x + xi] = "#";
    } else {
      area[droidPosition.y][droidPosition.x] =
        area[droidPosition.y][droidPosition.x] !== "-" ? "." : "-";
      area[droidPosition.y + yi][droidPosition.x + xi] = "D";
      droidPosition.x += xi;
      droidPosition.y += yi;
    }

    console.log(area.map((x) => x.join("")).join("\n"));
    reply = executeInstructions(instructions, relativeBase, reply[2], [
      area,
      droidPosition,
    ]);
    console.log(area.map((x) => x.join("")).join("\n"));
  }
  // console.log(findShortestPath(startPosition, droidPosition, area));
  console.log(findMaxMinutes(droidPosition, area));
};

const main = () => {
  const instructions = Deno.readTextFileSync("input.txt").split(",").map((x) =>
    +x
  );
  findPath(instructions);
  // executeInstructions(instructions, [0]);
};

main();
