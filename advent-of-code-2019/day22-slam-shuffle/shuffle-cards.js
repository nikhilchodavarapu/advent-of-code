const dealStack = (cards, increment = 0) => {
  const newStack = [];
  let j = 0;
  const reqIncr = increment || cards.length - 1;
  for (let i = 0; i < cards.length; i++) {
    newStack[j] = cards[i];
    j += reqIncr;
    j = j % cards.length || 1;
  }
  if (!increment) {
    newStack.push(newStack.shift());
  }
  console.log(newStack);
  return newStack;
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
    if (reqFn[0] === "cut") return [cut, +reqFn[1]];
    else return [dealStack, +reqFn[3]];
  });
};

const shuffleCards = () => {
  const cards = [];
  for (let i = 0; i < 10007; i++) {
    cards[i] = i;
  }
  const shuffleProcess = parseInput();
  let shuffledStack = [...cards];
  shuffleProcess.forEach((process) => {
    shuffledStack = process[0](shuffledStack, process[1]);
  });
  console.log(shuffledStack.indexOf(2019));
  return shuffledStack.indexOf(2019);
};

shuffleCards();
