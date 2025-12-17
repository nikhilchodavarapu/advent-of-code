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
        cameraOutput.push(String.fromCharCode(instructions[i1]));
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
        return cameraOutput.join("").split("\n").map((x) => x.split(""));
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
          cameraOutput[i + 1][j] === "#" && cameraOutput[i - 1] !== undefined &&
          cameraOutput[i - 1][j] === "#" &&
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
  return cameraOutput;
};

const getRobotPos = (cameraOutput) => {
  for (let i = 0; i < cameraOutput.length; i++) {
    const index = cameraOutput[i].findIndex((x) => x === "^");
    if (index !== -1) return ({ x: index, y: i, direction: "N", robo: "^" });
  }
};

const compass = {
  N: { R: "W", L: "E", M: [0, -1], robo: "^" },
  W: { R: "S", L: "N", M: [1, 0], robo: ">" },
  S: { R: "E", L: "W", M: [0, 1], robo: "v" },
  E: { R: "N", L: "S", M: [-1, 0], robo: "<" },
};

const moveForward = (pos) => {
  const nextPosDetails = compass[pos.direction];
  return {
    ...pos,
    x: pos.x + nextPosDetails.M[0],
    y: pos.y + nextPosDetails.M[1],
  };
};

const turn = (pos, direc) => {
  const nextPosDetails = compass[pos.direction];
  return {
    ...pos,
    direction: nextPosDetails[direc],
    robo: nextPosDetails.robo,
  };
};

const getPath = (robotPos, cameraOutput) => {
  const currentPos = { ...robotPos };
  const path = [];
  let isEnd = false;
  // console.log(moveForward(currentPos));
  while (!isEnd) {
    let moves = 0;
    let nextPosition = moveForward(currentPos);
    let x = nextPosition.x;
    let y = nextPosition.y;
    while (cameraOutput[y] !== undefined && cameraOutput[y][x] === "#") {
      cameraOutput[y][x] = currentPos.robo;
      cameraOutput[currentPos.y][currentPos.x] = "#";
      currentPos.x = x;
      currentPos.y = y;
      nextPosition = moveForward(currentPos);
      x = nextPosition.x;
      y = nextPosition.y;
      moves++;
    }
    if (moves !== 0) path.push(moves);
    nextPosition = moveForward(turn(currentPos, "R"));
    x = nextPosition.x;
    y = nextPosition.y;
    if (cameraOutput[y] === undefined || cameraOutput[y][x] !== "#") {
      nextPosition = moveForward(turn(currentPos, "L"));
      x = nextPosition.x;
      y = nextPosition.y;
      if (cameraOutput[y] === undefined || cameraOutput[y][x] !== "#") {
        isEnd = true;
      } else path.push("L");
    } else path.push("R");
    currentPos.direction = nextPosition.direction;
    console.log(cameraOutput.map((x) => x.join("")).join("\n"));
    for (let i = 0; i < 1000000000; i++);
    console.clear();
    // console.log("hello")
  }
  return path.join(",");
};

const main = () => {
  const instructions = Deno.readTextFileSync("input.txt").split(",").map((x) =>
    +x
  );
  //   const input = `..#..........
  // ..#..........
  // #######...###
  // #.#...#...#.#
  // #############
  // ..#...#...#..
  // ..#####...^..
  // `;
  // const cameraOutput = input.split("\n").map(x => x.split(""));
  const cameraOutput = getCameraOutput(instructions, [0]);
  // const intersected = locateScaffoldIntersections([...cameraOutput]);
  // console.log(intersected.map((x) => x.join("")).join("\n"));

  const robotPos = getRobotPos(cameraOutput);
  const path = getPath(robotPos, cameraOutput);
  console.log(path)
};


//1,R,9,R,11,R,11,R,5,R,9,R,11,R,13,R,9,R,11,R,11,R,13,R,5,L,13,L,13,R,9,R,11,R,11,R,5,R,9,R,11,R,13,R,13,R,5,L,13,L,13,R,9,R,11,R,11,R,5,R,9,R,11,R,13,R,13,R,5,L,13,L,13
main();
