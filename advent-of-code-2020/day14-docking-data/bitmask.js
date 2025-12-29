const overWriteVal = (val, mask) => {
  const overwroteVal = [];
  for (let i = 0; i < mask.length; i++) {
    overwroteVal[i] = mask[i] === "X" ? val[i] : mask[i];
  }
  return overwroteVal.join("");
};

const binaryToDecimal = (num) => {
  let decimalNumber = 0;
  for (let i = num.length - 1; i >= 0; i--) {
    decimalNumber += num[i] * (2 ** (num.length - i - 1));
  }
  return decimalNumber;
};

const updateMemory = (memory, address, mask, val) => {
  const binaryVal = val.toString(2).padStart(36, "0");
  const overwroteVal = overWriteVal(binaryVal, mask);
  const decimalVal = binaryToDecimal(overwroteVal);
  memory[address] = decimalVal;
};

const runBitmaskProgram = (program) => {
  const memory = {};
  let mask = "";
  for (let i = 0; i < program.length; i++) {
    const [ins, val] = program[i].split(" = ");
    if (ins === "mask") mask = val;
    else {
      const address = ins.split("[")[1].split(']')[0];
      updateMemory(memory, address, mask, +val);
    }
  }
  console.log(Object.values(memory).reduce((total, x) => total += x));
};

const main = () => {
  const program = Deno.readTextFileSync("input.txt").split("\r\n");
  runBitmaskProgram(program);
};

main();
