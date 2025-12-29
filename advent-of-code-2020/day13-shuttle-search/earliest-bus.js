const findEarliestBus = (buses, timeStamp) => {
  const departTime = buses.reduce((busNos, x) => {
    const remainder = timeStamp % x;
    busNos[timeStamp + x - remainder] = x;
    return busNos;
  }, {});
  const waitingTime = Object.keys(departTime).reduce(
    (time, x) => (time[x] = +x - timeStamp) && time,
    {},
  );
  console.log(waitingTime);
  const earliestBus = { busNo: -100, wtTime: Infinity };
  for (const key in waitingTime) {
    if (waitingTime[key] < earliestBus.wtTime) {
      earliestBus.busNo = +key;
      earliestBus.wtTime = waitingTime[key];
    }
  }
  earliestBus.busNo = departTime[earliestBus.busNo];
  console.log(earliestBus);
  console.log("Earliest Bus That I Can Take : ", earliestBus);
  return earliestBus;
};

const main = () => {
  const puzzleInput = Deno.readTextFileSync("input.txt").split("\r\n");
  const timeStamp = +puzzleInput[0];
  const buses = puzzleInput[1].split(",").filter((x) => x !== "x").map((x) =>
    +x
  );
  // console.log(puzzleInput, timeStamp, buses);
  const earliestBus = findEarliestBus(buses, timeStamp);
  console.log(earliestBus.busNo * earliestBus.wtTime);
};

main();
