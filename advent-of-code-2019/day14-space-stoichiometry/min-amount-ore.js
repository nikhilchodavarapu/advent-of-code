// 10 ORE => 10 A
// 1 ORE => 1 B
// 7 A, 1 B => 1 C
// 7 A, 1 C => 1 D
// 7 A, 1 D => 1 E
// 7 A, 1 E => 1 FUEL

const isEveryThingORE = (reactions, material) =>
  reactions[material].every((x) => x.split(" ")[1] === "ORE");

const convert = (reactions, key, quantities) => {
  for (const element of reactions[key]) {
    const material = element.split(" ");
    console.log(reactions);
    if (
      reactions[material[1]] !== undefined &&
      !(reactions[material[1]].length === 1 &&
        reactions[material[1]][0].split(" ")[1] === "ORE")
    ) {
      const quantity = quantities[material[1]];
      const materialQuantity = parseInt(material[0]);
      let requiredQuantity = materialQuantity / quantity;
      if (materialQuantity % quantity !== 0) {
        requiredQuantity =
          (materialQuantity + (quantity - materialQuantity % quantity)) /
          quantity;
      }
      reactions[material[1]] = reactions[material[1]].map((x) => {
        const element = x.split(" ");
        const quantity = requiredQuantity * parseInt(element[0]);
        return `${quantity} ${element[1]}`;
      });
    }
  }
  reactions[key] = reactions[key].flatMap((x) => {
    const element = x.split(" ");
    if (element[1] === "ORE") {
      return x;
    }
    return reactions[element[1]];
  });
  if (!isEveryThingORE(reactions, key)) convert(reactions, key, quantities);
  reactions[key] = reactions[key].reduce((total, x) => {
    const element = x.split(" ");
    console.log(total);
    total[element[1]] = total[element[1]] || 0;
    total[element[1]] += +element[0];
    return total;
  }, {});
  reactions[key] = Object.entries(reactions[key]).map(([k, v]) => `${v} ${k}`);
  return reactions;
};

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

  console.log(quantities);
  const updatedReactions = Object.entries(reactions).reduce(
    (obj, [key, val]) => (obj[key.split(" ")[1]] = val) && obj,
    {},
  );
  // console.log(updatedReactions);

  // let quantityOfOre = 0;
  // for (const element of updatedReactions.FUEL) {
  //   const material = element.split(" ");
  //   quantityOfOre += +material[0];
  //   const requiredQuantity = materialQuantity % quantity
  //     ? (materialQuantity + (quantity - materialQuantity % quantity)) /
  //       quantity
  //     : materialQuantity / quantity;
  //   console.log(materialQuantity, requiredQuantity);
  //   quantityOfOre += requiredQuantity *
  //     convert(reactions, material, quantities);
  //   // console.log(convert(updatedReactions, material, quantities));
  //   console.log("\n\n");
  // }

  console.log(convert(updatedReactions, "FUEL", quantities));
  // for (const key in reactions) {
  //   reactions[key] = reactions[key].map((x) => {
  //     const splitted = x.split(" ");
  //     return { [splitted[1]]: splitted[0] };
  //   });
  // }
  return reactions;
};

findMinAmountOfORE();
