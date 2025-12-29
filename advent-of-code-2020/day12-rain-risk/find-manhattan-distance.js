const updateWayPoint = (val, direction, wayPoint) => {
  const compass = {
    N: (val) => wayPoint.y += val,
    E: (val) => wayPoint.x += val,
    S: (val) => wayPoint.y -= val,
    W: (val) => wayPoint.x -= val,
  };

  return compass[direction](val);
};

const rotate = (deg, wayPoint) => {
  const noOfTimes = (deg / 90) % 4;
  if (noOfTimes > 0) {
    for (let i = 0; i < noOfTimes; i++) {
      const temp = wayPoint.x;
      wayPoint.x = wayPoint.y;
      wayPoint.y = -temp;
    }
  } else {
    for (let i = 0; i < Math.abs(noOfTimes); i++) {
      const temp = wayPoint.x;
      wayPoint.x = -wayPoint.y;
      wayPoint.y = temp;
    }
  }
};

const execute = {
  F: (val, wayPoint, currPos) => {
    currPos.x += wayPoint.x * val;
    currPos.y += wayPoint.y * val;
  },
  L: (deg, wayPoint) => rotate(-deg, wayPoint),
  R: (deg, wayPoint) => rotate(deg, wayPoint),
};

const wayPoint = { x: 10, y: 1 };

const navigate = (instructions) => {
  const currPos = { x: 0, y: 0, direction: "E" };
  instructions.forEach((instruction) => {
    const ins = instruction.slice(0, 1);
    const val = +instruction.slice(1);
    if (execute[ins]) {
      execute[ins](val, wayPoint, currPos);

      console.log(wayPoint);
    } else updateWayPoint(val, ins, wayPoint);
  });
  console.log(Math.abs(currPos.x) + Math.abs(currPos.y));
};

const main = () => {
  const instructions = Deno.readTextFileSync("input.txt").split("\r\n");
  navigate(instructions);
};

main();
