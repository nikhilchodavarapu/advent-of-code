const countAdjacentBugs = (layout, i, j) => {
  const adjacentIndices = [
    [0, -1],
    [0, 1],
    [1, 0],
    [-1, 0],
  ];
  let count = 0;
  adjacentIndices.forEach((indices) => {
    const adjacentTile = layout[i + indices[0]] === undefined
      ? "."
      : layout[i + indices[0]][j + indices[1]];
    count += adjacentTile === "#" ? 1 : 0;
  });
  return count;
};

const generateNextLayout = (layout) => {
  const newLayout = [];
  for (let i = 0; i < layout.length; i++) {
    newLayout[i] = [];
    for (let j = 0; j < layout[i].length; j++) {
      const count = countAdjacentBugs(layout, i, j);
      if (layout[i][j] === "#") {
        newLayout[i][j] = count !== 1 ? "." : "#";
      } else {
        newLayout[i][j] = count === 1 || count === 2 ? "#" : ".";
      }
    }
  }
  return newLayout;
};

const alreadyGot = (layouts, currentLayout) => {
  for (let index = 0; index < layouts.length; index++) {
    // layouts.forEach((layout) => {
    const layout = layouts[index];
    let isEqual = true;
    for (let i = 0; i < layout.length; i++) {
      for (let j = 0; j < layout[i].length; j++) {
        isEqual = layout[i][j] === currentLayout[i][j];
        if (!isEqual) break;
      }
      if (!isEqual) break;
    }
    if (isEqual) return true;
  }
  return false;
};

const transform = (layout) => {
  const layouts = [layout];
  let newLayout = generateNextLayout(layout);
  while (!alreadyGot(layouts, newLayout)) {
    layouts.push(newLayout);
    newLayout = generateNextLayout(newLayout);
  }

  console.log(newLayout.map((x) => x.join("")).join("\n"));
  return newLayout;
};

const getBugPositions = (layout) => {
  const positions = [];
  for (let i = 0; i < layout.length; i++) {
    for (let j = 0; j < layout[i].length; j++) {
      if (layout[i][j] === "#") positions.push(i * 5 + j);
    }
  }
  return positions;
};

const main = () => {
  const layout = `....#
#..#.
##..#
#.###
.####`.split("\n").map((x) => x.split(""));
  const repeatedLayout = transform(layout);
  const bugPositions = getBugPositions(repeatedLayout);
  const biodiversityRating = bugPositions.reduce((sum, x) => sum + (2 ** x), 0);
  console.log(biodiversityRating);
};

main();
