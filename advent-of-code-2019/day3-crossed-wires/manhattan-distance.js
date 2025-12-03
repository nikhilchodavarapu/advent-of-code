const savePath = (xi, yi, move, path, panel) => {
  for (let i = 0; i < move; i++) {
    panel.x += xi;
    panel.y += yi;
    path.push({ ...panel });
  }
};

const executeInstructions = {
  L: (move, panel, path) => savePath(-1, 0, move, path, panel),
  R: (move, panel, path) => savePath(1, 0, move, path, panel),
  U: (move, panel, path) => savePath(0, 1, move, path, panel),
  D: (move, panel, path) => savePath(0, -1, move, path, panel),
};

const getWirePath = (moves, path, panel) => {
  moves.forEach((move) => {
    executeInstructions[move[0]](+move.slice(1), panel, path);
  });
  return path;
};

const _getDistance = ({ x, y }) => Math.abs(x) + Math.abs(y);

const countSteps = ({ x, y }, path) => {
  let i = 0;
  while (i < path.length && !(x === path[i].x && y === path[i].y)) i++;
  return i + 1;
};

const findManhattanDistance = (wire1, wire2) => {
  const wire1Path = getWirePath(wire1, [], { x: 0, y: 0 });
  const wire2Path = getWirePath(wire2, [], { x: 0, y: 0 });
  const intersectionPoints = [];
  wire1Path.forEach(({ x: x1, y: y1 }) => {
    wire2Path.forEach(({ x: x2, y: y2 }) => {
      if (x1 === x2 && y1 === y2) {
        intersectionPoints.push({ x: x1, y: y1 });
      }
    });
  });
  // let closestDistance = Infinity;
  // let closestPoint = {};
  // intersectionPoints.forEach((point) => {
  //   const distance = getDistance(point);
  //   if (closestDistance > distance) {
  //     closestDistance = distance;
  //     closestPoint = point;
  //   }
  // });

  let closestSteps = Infinity;
  intersectionPoints.forEach((point) => {
    const steps = countSteps(point, wire1Path) +
      countSteps(point, wire2Path);
    if (closestSteps > steps) {
      closestSteps = steps;
    }
  });
  return closestSteps;
};

const manhattanDistance = () => {
  const [wire1, wire2] = Deno.readTextFileSync("input.txt").split("\n").map(
    (x) => x.split(","),
  );
  console.log(findManhattanDistance(wire1, wire2));
};

manhattanDistance();
