const countYes = (answers) => {
  let count = 0;
  answers.forEach((answer) => {
    const answersOfAPerson = answer.split("\r\n").flatMap((x) => x.split(""));
    const uniqueAnswers = answersOfAPerson.reduce(
      (unique, x) => {
        unique[x] = unique[x] || 0;
        unique[x]++;
        return unique;
      },
      {},
    );
    const numberOfPeople = answer.split("\r\n").length;
    for (const key in uniqueAnswers) {
      if (uniqueAnswers[key] === numberOfPeople) count++;
    }
    // count += Object.keys(uniqueAnswers).length;
  });
  return count;
};

const main = () => {
  const answers = Deno.readTextFileSync("input.txt").split("\r\n\r\n");
  console.log(countYes(answers));
};

main();
