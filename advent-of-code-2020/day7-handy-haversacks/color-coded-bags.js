const _getAllBagsThatCotainShinyGold = (rules, bag, n = 1) => {
  const shinyGoldBags = {};
  for (const key in rules) {
    if (Object.keys(rules[key]).includes(bag)) {
      shinyGoldBags[key] = rules[key][bag] * n;
    }
  }
  return shinyGoldBags;
};

const bagsInsideBag = (rules, bag, n = 1) => {
  const bags = {};
  for (const key in rules[bag]) {
    bags[key] = rules[bag][key] * n;
  }
  return bags;
};

const parseInput = (input) => {
  const rules = input.map((x) => {
    const newArr = [];
    newArr.push(x.split("s contain ")[0]);
    newArr.push(
      x.split("s contain ")[1].split(/s, |, /).reduce(
        (bagsWithType, x) => {
          const firstSpaceIndex = x.indexOf(" ");
          const noOfBags = +x.slice(0, firstSpaceIndex);
          const type = x.slice(firstSpaceIndex + 1);
          bagsWithType[type] = noOfBags;
          // console.log(bagsWithType);
          return bagsWithType;
        },
        {},
      ),
    );
    return newArr;
  })
    .reduce((rule, x) => {
      rule[x[0]] = x[1];
      return rule;
    }, {});
  return rules;
};

// const part1 = (rules) => {
//   let bags = getAllBagsThatCotainShinyGold(rules, "shiny gold bag");
//   const allBags = { ...bags };
//   let isEnd = false;
//   while (!isEnd) {
//     const nextBags = {};
//     const keys = Object.keys(bags);
//     for (let i = 0; i < keys.length; i++) {
//       const key = keys[i];
//       const something = getAllBagsThatCotainShinyGold(rules, key, bags[key]);
//       for (const key in something) {
//         nextBags[key] = something[key];
//         allBags[key] = something[key];
//       }
//     }
//     bags = nextBags;
//     isEnd = Object.keys(bags).every((x) =>
//       Object.keys(getAllBagsThatCotainShinyGold(rules, x)).length === 0
//     );
//   }
//   console.log(allBags);
//   console.log(Object.keys(allBags).length);
// }

const main = () => {
  const input = Deno.readTextFileSync("input.txt").split(/s.\r\n|.\r\n/);
  const rules = parseInput(input);
  let bags = bagsInsideBag(rules, "shiny gold bag");

  const allBags = { ...bags };
  let isEnd = false;
  const toAdd = [];
  while (!isEnd) {
    const nextBags = {};
    const keys = Object.keys(bags);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (!isNaN(bags[key])) toAdd.push(bags[key]);
      const something = bagsInsideBag(rules, key, bags[key]);
      for (const key in something) {
        nextBags[key] = nextBags[key] || 0;
        nextBags[key] += something[key];
        allBags[key] = something[key];
      }
    }
    bags = nextBags;
    isEnd = Object.keys(bags).every((x) =>
      Object.keys(bagsInsideBag(rules, x)).length === 0
    );
    console.log(bags);
  }
  console.log(bags, toAdd.reduce((total, x) => total + x));
};

main();
