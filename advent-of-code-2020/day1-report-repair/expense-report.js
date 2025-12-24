const getEntries = (report, reqSum) => {
  const sortedReport = report.toSorted((a, b) => a - b);
  let i = 0;
  // while (sortedReport[i] < reqSum / 2) i++;
  // const limit = i;
  // // console.log(sortedReport, limit)
  // for (let i = 0; i <= limit; i++) {
  //   for (let j = sortedReport.length - 1; j >= limit; j--) {
  //     // console.log(sortedReport[i] + sortedReport[j]);
  //     if ((sortedReport[i] + sortedReport[j]) === reqSum) {
  //       return [sortedReport[i], sortedReport[j]];
  //     }
  //   }
  // }

  while (sortedReport[i] < reqSum / 2) i++;
  const limit = i;
  // console.log(sortedReport, limit)
  for (let i = 0; i <= limit; i++) {
    for (let j = sortedReport.length - 1; j >= limit; j--) {
      for (let k = 0; k < sortedReport.length; k++) {
        if (
          (sortedReport[i] + sortedReport[j] + sortedReport[k]) === reqSum &&
          k !== i && k !== j
        ) {
          return [sortedReport[i], sortedReport[j], sortedReport[k]];
        }
      }
    }
  }
  return -1;
};

const main = () => {
  const report = Deno.readTextFileSync("input.txt").split("\n").map((x) => +x);
  const entries = getEntries(report, 2020);
  // console.log(entries[0] * entries[1]);
  console.log(entries);
  console.log(entries[0] * entries[1] * entries[2]);
};

main();
