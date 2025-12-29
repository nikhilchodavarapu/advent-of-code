const noOfWaysToRepresent = (noOf1s) => { // tribonacci series
  let a = 1, b = 1, c = 2;
  let tribonacciVal = 0;
  if (noOf1s < 3) {
    return noOf1s === 2 ? 2 : 1;
  }
  for (let i = 3; i <= noOf1s; i++) {
    tribonacciVal = a + b + c;
    a = b;
    b = c;
    c = tribonacciVal;
  }
  return c;
};

const findChain = (adapters) => {
  const sortedRatings = adapters.toSorted((a, b) => a - b);
  sortedRatings.unshift(0);
  sortedRatings.push(sortedRatings.at(-1) + 3);
  // const differences = {
  //   1: 0,
  //   3: 0,
  // };
  const oneDiff = []
  let currDiff = [];
  for (let i = 0; i < sortedRatings.length - 1; i++) {
    const diff = sortedRatings[i + 1] - sortedRatings[i];
    if (diff === 3) {
      oneDiff.push(currDiff);
      currDiff = [];
    } else {
      currDiff.push(diff);
    }
    // differences[diff]++;
  }
  // differences[3]++;
  if (currDiff.length !== 0) {
    oneDiff.push(currDiff);
  }

  let product = 1;
  // differences[1][0].shift();
  oneDiff.forEach((series) => {
    product *= noOfWaysToRepresent(series.length);
  });
  console.log(product);
  console.log(oneDiff);
  // console.log(differences[1] * differences[3])
};

const main = () => {
  const adapters = Deno.readTextFileSync("input.txt").split("\n").map((x) =>
    +x
  );
  findChain(adapters);
};

main();

// 1, 4, 5, 6, 7, 10, 11, 12, 15, 16, 19
// 3 1 1 1 3 1 1 3 1 3

// 1      => 1

// 1 1
// 2      => 2

// 1 1 1
// 1 2    => 4
// 2 1
// 3

// 1 1 1 1
// 1 2 1
// 1 1 2
// 2 1 1      => 7
// 2 2
// 3 1
// 1 3

// 1 1 1 1 1
// 1 1 1 2
// 1 1 2 1
// 1 2 1 1
// 2 1 1 1
// 1 2 2        => 13
// 2 1 2
// 2 2 1
// 3 1 1
// 1 1 3
// 1 3 1
// 3 2
// 2 3

// 1 1 1 1 1 1
// 1 1 1 1 2
// 1 1 1 2 1
// 1 1 2 1 1
// 1 2 1 1 1
// 2 1 1 1 1
// ..
// 1 1 2 2
// 1 2 1 2
// 2 1 1 2
// 2 1 2 1
// 1 2 2 1
// 2 2 1 1
// ..
// 2 2 2        => 24
// 3 1 1 1
// 1 1 1 3
// 1 3 1 1
// 1 1 3 1
// 3 2 1
// 1 2 3
// 2 3 1
// 2 1 3
// 1 3 2
// 1 2 3
// 3 3
