// 10 ORE => 10 A
// 1 ORE => 1 B
// 7 A, 1 B => 1 C
// 7 A, 1 C => 1 D
// 7 A, 1 D => 1 E
// 7 A, 1 E => 1 FUEL

const convert = (reactions, key, quantities) => {
  let quantityOfOre = 0;
  for (const element of reactions[key]) {
    while (reactions[element]) {
      const splittedElement = element.split(" ");
      const quantity = quantities[splittedElement[1]];
      quantityOfOre += +splitted[0] + ( quantity - splitted[0] % quantity);
      element = reactions
    }
  }
}

const findMinAmountOfORE = () => {
  const input = Deno.readTextFileSync("input.txt");
  const reactions = input.split("\n").map((x) => x.split(" => ")).reduce(
    (reactions, x) => (reactions[x[1]] = x[0].split(", ")) && reactions,
    {},
  );
  for (const key in reactions) {
    reactions[key] = reactions[key].flatMap((x) =>
      reactions[x] ? reactions[x] : x
    );
  }

  const quantities = Object.keys(reactions).reduce((obj, x) => {
    const splitted = x.split(" ");
    obj[splitted[1]] = +splitted[0];
    return obj;
  }, {});

  console.log(quantities)
  const updatedReactions = Object.entries(reactions).reduce((obj, [key, val]) =>
    (obj[key.split(" ")[1]] = val) && obj, {})
  console.log(updatedReactions)

  for (const key in updatedReactions) {
    console.log(convert(reactions, key, quantities))
  }

  // for (const key in reactions) {
  //   reactions[key] = reactions[key].map((x) => {
  //     const splitted = x.split(" ");
  //     return { [splitted[1]]: splitted[0] };
  //   });
  // }
  return reactions;
};

console.log(findMinAmountOfORE());
