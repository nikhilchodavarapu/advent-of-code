const dealStack = (cards, increment = 0) => {
  const newStack = [];
  let j = 0;
  const reqIncr = increment || cards.length - 1;
  for (let i = 0; i < cards.length; i++) {
    newStack[j] = cards[i];
    j += reqIncr;
    j = j % cards.length;
  }
  if (!increment) {
    newStack.push(newStack.shift());
  }
  return newStack;
};

const dealStackIndex = (length, index, increment) => {
  if (index === 1 && increment) return index;
  if (!increment) return length - index - 1;
  return (index * increment) % length;
};

const cutStackIndex = (length, index, noOfCards) => {
  if (noOfCards > 0) return (length - noOfCards + index) % length;
  else return (index - noOfCards) % length;
};

const cut = (cards, noOfCards) => {
  if (noOfCards > 0) {
    const cutStack = cards.slice(0, noOfCards);
    return cards.slice(noOfCards).concat(cutStack);
  } else {
    const cutStack = cards.slice(noOfCards);
    return cutStack.concat(cards.slice(0, noOfCards));
  }
};

const parseInput = () => {
  const input = Deno.readTextFileSync("input.txt").split("\n");
  return input.map((x) => {
    const reqFn = x.split(" ");
    // if (reqFn[0] === "cut") return [cut, +reqFn[1]];
    // else return [dealStack, +reqFn[3]];
    if (reqFn[0] === "cut") return [cutStackIndex, +reqFn[1]];
    else return [dealStackIndex, +reqFn[3]];
  });
};

const shuffleCards = () => {
  // const cards = [];
  // for (let i = 0; i < 10007; i++) {
  //   cards[i] = i;
  // }
  const shuffleProcess = parseInput();
  // let shuffledStack = [...cards];
  // shuffleProcess.forEach((process) => {
  //   shuffledStack = process[0](shuffledStack, process[1]);\
  // });
  // console.log(shuffledStack.indexOf(2019));
  // return shuffledStack.indexOf(2019);

  let index = 2020;
  const length = 101741582076661;
  shuffleProcess.forEach((process) => {
    index = process[0](length, index, process[1]);
  });
  console.log(index);
  return index;
};

shuffleCards();
