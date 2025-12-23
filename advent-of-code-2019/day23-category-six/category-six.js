const add = (i, j, k, instructions) =>
  instructions[k] = instructions[i] + instructions[j];
const mul = (i, j, k, instructions) =>
  instructions[k] = instructions[i] * instructions[j];
// const getInput = (i, instructions) => instructions[i] = 1;
const _getInput = (i, instructions) => instructions[i] = 1;
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
  const program = Deno.readTextFileSync("input.txt").split(",").map((x) => +x);
  const N = 50;

  // state
  const inputs = Array.from({ length: N }, () => []);
  const indexes = Array(N).fill(0);
  const relativeBases = Array(N).fill(0);
  const programs = Array.from({ length: N }, () => [...program]);

  // give each computer its address
  for (let i = 0; i < N; i++) {
    inputs[i].push(i);
  }

  const NAT = { x: null, y: null };
  let lastSentY = null;

  while (true) {
    let anyPacketActivity = false;
    let anyQueueNonEmpty = false;

    for (let i = 0; i < N; i++) {
      if (inputs[i].length > 0) anyQueueNonEmpty = true;

      const result = executeInstructions(
        programs,
        relativeBases,
        inputs,
        indexes,
        i,
      );

      if (Array.isArray(result)) {
        const [dest, x, y] = result;
        anyPacketActivity = true;

        if (dest === 255) {
          NAT.x = x;
          NAT.y = y;
        } else {
          inputs[dest].push(x, y);
        }
      }
    }

    // ✅ CORRECT IDLE CHECK
    if (!anyPacketActivity && !anyQueueNonEmpty && NAT.y !== null) {
      inputs[0].push(NAT.x, NAT.y);

      if (lastSentY === NAT.y) {
        console.log("ANSWER:", NAT.y);
        break;
      }

      lastSentY = NAT.y;
    }
  }
};
main();
