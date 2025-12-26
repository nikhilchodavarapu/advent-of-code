const isPair = (numbers, sum) => {
  const sorted = numbers.toSorted((a, b) => a - b);
  let i = 0;
  while (sorted[i] < sum / 2) i++;
  const limit = i;
  for (let i = 0; i <= limit; i++) {
    for (let j = sorted.length - 1; j >= limit; j--) {
      if ((sorted[i] + sorted[j]) === sum) {
        return true;
      }
    }
  }
  return sum;
};

const isSumEqualsToOrGreater = (numbers, sum) => {
  let i = 0;
  let j = 0;
  const sorted = numbers.toSorted((a, b) => a - b)
  while (i < numbers.length) {

  }
}

const main = () => {
  const input = Deno.readTextFileSync("input.txt").split("\n").map((x) => +x);
  let i = 0;
  for (i = 25; i < input.length - 1; i++) {
    if (typeof isPair(input.slice(i - 25, i), input[i]) === "number") break;
  }
  console.log(input[i]);
};

main();
