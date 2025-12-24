const isValid = (low, high, letter, password) => {
  // PART - 1
  // const count = password.split("").reduce(
  //   (count, x) => count += x === letter ? 1 : 0,
  //   0,
  // );
  // return low <= count && count <= high;

  // PART - 2
  const isInFirstPos = password[low - 1] === letter;
  const isInSecondPos = password[high - 1] === letter;
  return !(isInSecondPos && isInFirstPos) && (isInFirstPos || isInSecondPos);
};

const verifyPasswords = (list) => {
  let validPasswords = 0;
  list.forEach((line) => {
    const [policy, password] = line.split(": ");
    const [low, high, letter] = policy.split(" ").flatMap((x) => x.split("-"));
    validPasswords += isValid(low, high, letter, password) ? 1 : 0;
  });
  return validPasswords;
};

const main = () => {
  const passwordsList = Deno.readTextFileSync("input.txt").split("\n");
  console.log(verifyPasswords(passwordsList));
};

main();
