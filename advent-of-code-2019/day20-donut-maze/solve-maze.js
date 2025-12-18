const compass = {
  N: { R: "W", L: "E", M: [0, -1] },
  W: { R: "S", L: "N", M: [1, 0] },
  S: { R: "E", L: "W", M: [0, 1] },
  E: { R: "N", L: "S", M: [-1, 0] },
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
  };
};

const getTilePos = (maze, [a1, a2], otherThan) => {
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      if (i === otherThan.y && j === otherThan.x) continue;
      if (maze[i][j] === a1 && maze[i][j + 1] === a2) {
        return maze[i][j + 2] === "."
          ? { x: j + 2, y: i, direction: "W" }
          : { x: j - 1, y: i, direction: "E" };
      }
      if (
        maze[i + 1] !== undefined && maze[i][j] === a1 &&
        maze[i + 1][j] === a2
      ) {
        return (maze[i + 2] !== undefined && maze[i + 2][j] === ".")
          ? { x: j, y: i + 2, direction: "S" }
          : { x: j, y: i - 1, direction: "N" };
      }
    }
  }
};

const getTile = (maze, pos) => {
  const tilePos = {
    S: [0, 0, 1, 2],
    N: [0, 0, -2, -1],
    W: [1, 2, 0, 0],
    E: [-2, -1, 0, 0],
  };

  const y = pos.y + tilePos[pos.direction][2];
  const x = pos.x + tilePos[pos.direction][0];

  return {
    x,
    y,
    nextTile: [
      maze[y][x],
      maze[pos.y + tilePos[pos.direction][3]][
        pos.x + tilePos[pos.direction][1]
      ],
    ],
  };
};

const solveMaze = (maze) => {
  const pos = getTilePos(maze, ["A", "A"], { x: -1, y: -1 });
  console.log(pos);
  let tile = ["A", "A"];
  let steps = 0;
  while (tile.join("") !== "ZZ") {
    let nextPosition = moveForward(pos);
    let x = nextPosition.x;
    let y = nextPosition.y;
    while (maze[y][x] === ".") {
      maze[y][x] = "*";
      maze[pos.y][pos.x] = ".";
      pos.x = x;
      pos.y = y;
      nextPosition = moveForward(pos);
      x = nextPosition.x;
      y = nextPosition.y;
      steps++;
      for (let i = 0; i < 1000000000; i++);
      console.clear();
      console.log(maze.map((x) => x.join("")).join("\n"));
    }
    if (maze[y][x] !== "#") {
      const { x, y, nextTile } = getTile(maze, pos);
      console.log(nextTile);
      tile = nextTile;
      if (tile.join("") === "ZZ") break;
      const tilePos = getTilePos(maze, nextTile, { x, y });
      console.log(tilePos);
      maze[pos.y][pos.x] = ".";
      pos.x = tilePos.x;
      pos.y = tilePos.y;
      maze[pos.y][pos.x] = "*";
      steps++;
      pos.direction = tilePos.direction;

      for (let i = 0; i < 1000000000; i++);
      console.clear();
      console.log(maze.map((x) => x.join("")).join("\n"));
    } else {
      nextPosition = moveForward(turn(pos, "R"));
      x = nextPosition.x;
      y = nextPosition.y;
      if (maze[y][x] === "#") {
        nextPosition = moveForward(turn(pos, "L"));
        x = nextPosition.x;
        y = nextPosition.y;
        if (maze[y][x] === "#") {
          nextPosition = moveForward(turn(pos, "L"));
          x = nextPosition.x;
          y = nextPosition.y;
          maze[pos.y][pos.x] = ".";
          pos.x = x;
          pos.y = y;
          maze[pos.y][pos.x] = "*";
          pos.direction = nextPosition.direction;
          let leftForward = moveForward(turn(pos, "L"));
          let rightForward = moveForward(turn(pos, "R"));
          while (
            maze[leftForward.y][leftForward.x] === "#" &&
            maze[rightForward.y][rightForward.x] === "#"
          ) {
            nextPosition = moveForward(pos);
            x = nextPosition.x;
            y = nextPosition.y;
            maze[pos.y][pos.x] = ".";
            pos.x = x;
            pos.y = y;
            maze[pos.y][pos.x] = "*";
            leftForward = moveForward(turn(pos, "L"));
            rightForward = moveForward(turn(pos, "R"));
          }
          if (maze[leftForward.y][leftForward.x] !== "#") {
            nextPosition = moveForward(turn(pos, "L"));
          } else nextPosition = moveForward(turn(pos, "R"));

          x = nextPosition.x;
          y = nextPosition.y;
          maze[pos.y][pos.x] = ".";
          pos.x = x;
          pos.y = y;
          maze[pos.y][pos.x] = "*";
          pos.direction = nextPosition.direction;
        } else pos.direction = nextPosition.direction;
      } else pos.direction = nextPosition.direction;

      for (let i = 0; i < 1000000000; i++);
      console.clear();
      console.log(maze.map((x) => x.join("")).join("\n"));
    }
  }
  // console.log(maze.map((x) => x.join("")).join("\n"));
  console.log(steps);
  // if (moves !== 0) path.push(moves);
  // nextPosition = moveForward(turn(pos, "R"));
  // x = nextPosition.x;
  // y = nextPosition.y;
  // if (maze[y] === undefined || maze[y][x] !== "#") {
  //   nextPosition = moveForward(turn(pos, "L"));
  //   x = nextPosition.x;
  //   y = nextPosition.y;
  //   if (maze[y] === undefined || maze[y][x] !== "#") {
  //     isEnd = true;
  //   } else path.push("L");
  // } else path.push("R");
  // pos.direction = nextPosition.direction;
};

const main = () => {
  const input = Deno.readTextFileSync("input.txt").split("\n").map((x) =>
    x.split("")
  );
  solveMaze(input);
};

main();
