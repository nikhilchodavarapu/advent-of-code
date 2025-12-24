const countTrees = (map, slope) => {
  let row = 0;
  let col = 0;
  let count = 0;
  while (row < map.length) {
    count += map[row][col] === "#" ? 1 : 0;
    col = (col + slope[0]) % map[row].length;
    row += slope[1];
  }
  return count;
};

const main = () => {
  const map = Deno.readTextFileSync("input.txt").split("\n").map((x) =>
    x.split("")
  );
  const slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];
  const productOfCount = slopes.reduce(
    (product, slope) => product *= countTrees(map, slope),
    1,
  );
  console.log(productOfCount);
};

main();
