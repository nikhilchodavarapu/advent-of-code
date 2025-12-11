// 10 ORE => 10 A
// 1 ORE => 1 B
// 7 A, 1 B => 1 C
// 7 A, 1 C => 1 D
// 7 A, 1 D => 1 E
// 7 A, 1 E => 1 FUEL

const convert = (reactions, [value, key], quantities) => {
  let quantityOfOre = 0;
  console.log(value, key, "\n\n");
  if (reactions[key] !== undefined) {
    for (const element of reactions[key]) {
      const material = element.split(" ");
      const materialQuantity = parseInt(material[0]);
      if (material[1] === "ORE") {
        quantityOfOre += materialQuantity;
        console.log(quantityOfOre);
      } else {
        const quantity = quantities[material[1]];
        let requiredQuantity = materialQuantity / quantity;
        if (materialQuantity % quantity !== 0) {
          const mayReqQuantity =
            (materialQuantity + (quantity - materialQuantity % quantity)) /
            quantity;
          requiredQuantity = mayReqQuantity === 1 ? quantity : mayReqQuantity;
        }
        console.log(quantity, materialQuantity, requiredQuantity);
        quantityOfOre += requiredQuantity *
          convert(reactions, material, quantities);
        console.log(quantityOfOre);
      }
    }
  }
  return quantityOfOre;
};

const findMinAmountOfORE = () => {
  const input = Deno.readTextFileSync("input.txt");
  const reactions = input.split("\r\n").map((x) => x.split(" => ")).reduce(
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
  console.log(updatedReactions);

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

  console.log(convert(updatedReactions, [1, "FUEL"], quantities));
  // for (const key in reactions) {
  //   reactions[key] = reactions[key].map((x) => {
  //     const splitted = x.split(" ");
  //     return { [splitted[1]]: splitted[0] };
  //   });
  // }
  return reactions;
};

console.log(findMinAmountOfORE());
