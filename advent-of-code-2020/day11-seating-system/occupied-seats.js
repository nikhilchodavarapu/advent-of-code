const noOfAdjacentOccupiedSeats = (layout, i, j) => {
  const visibleSeats = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, -1],
    [-1, 1],
  ];

  let count = 0;
  let x = i;
  let y = j;
  visibleSeats.forEach((vsblSeat) => {
    x += vsblSeat[0];
    y += vsblSeat[1];
    while (layout[x] && layout[x][y] && layout[x][y] === ".") {
      x += vsblSeat[0];
      y += vsblSeat[1];
      // console.log(x, y, layout[x][y]);
    }
    if (layout[x] && layout[x][y] === "#") count++;
    x = i;
    y = j;
  });
  return count;
};

const applyOneRoundOfRules = (layout) => {
  const newLayout = [];
  const rules = {
    L: (adjSeats) => adjSeats === 0 ? "#" : "L",
    "#": (adjSeats) => adjSeats >= 5 ? "L" : "#",
    ".": () => ".",
  };
  for (let i = 0; i < layout.length; i++) {
    newLayout[i] = [];
    for (let j = 0; j < layout[i].length; j++) {
      newLayout[i][j] = rules[layout[i][j]](
        noOfAdjacentOccupiedSeats(layout, i, j),
      );
    }
  }
  return newLayout;
};

const areLayoutsEqual = (l1, l2) => {
  for (let i = 0; i < l1.length; i++) {
    for (let j = 0; j < l1[i].length; j++) {
      if (l1[i][j] !== l2[i][j]) return false;
    }
  }
  return true;
};

const copyNestedArray = (arr) => arr.map((x) => [...x]);

const findStableLayout = (layout) => {
  let currentLayout = layout;
  let nextLayout = applyOneRoundOfRules(currentLayout);
  while (!areLayoutsEqual(currentLayout, nextLayout)) {
    currentLayout = copyNestedArray(nextLayout);
    nextLayout = applyOneRoundOfRules(currentLayout);
  }
  return currentLayout;
};

const isOccupied = (seat) => seat === "#";

const countOccupiedSeats = (layout) => {
  let count = 0;
  layout.forEach((row) => {
    row.forEach((seat) => {
      count += isOccupied(seat) ? 1 : 0;
    });
  });
  return count;
};

const main = () => {
  const layout = Deno.readTextFileSync("input.txt").split("\r\n").map((x) =>
    x.split("")
  );

  // console.log(
  //   applyOneRoundOfRules(applyOneRoundOfRules(layout))
  //     .map((x) => x.join(""))
  //     .join("\n"),
  // );

  // console.log();
  // console.log(
  //   applyOneRoundOfRules(applyOneRoundOfRules(applyOneRoundOfRules(layout)))
  //     .map((x) => x.join(""))
  //     .join("\n"),
  // );
  const stableLayout = findStableLayout(layout);
  console.log(stableLayout.map((x) => x.join("")).join("\n"));
  console.log(countOccupiedSeats(stableLayout));
};

main();
