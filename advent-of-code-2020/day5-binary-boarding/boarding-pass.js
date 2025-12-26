const findSeatNumber = (seat) => {
  const arrange = {
    F: (seatPosition) => {
      seatPosition.high = Math.floor(
        (seatPosition.low + seatPosition.high) / 2,
      );
    },
    B: (
      seatPosition,
    ) => {
      seatPosition.low = Math.ceil((seatPosition.low + seatPosition.high) / 2);
    },
  };
  arrange.L = arrange.F;
  arrange.R = arrange.B;
  const seatPositionRow = { low: 0, high: 127 };
  for (let i = 0; i < seat.length - 3; i++) {
    arrange[seat[i]](seatPositionRow);
  }
  const seatPositionCol = { low: 0, high: 7 };
  for (let i = seat.length - 3; i < seat.length; i++) {
    arrange[seat[i]](seatPositionCol);
  }

  const seatNumber = seatPositionRow.high * 8 + seatPositionCol.high;
  return seatNumber;
};

const getMySeatNumber = (seatNumbers) => {
  const sortedNumbers = seatNumbers.toSorted((a, b) => a - b);
  for (let i = 0; i < sortedNumbers.length - 1; i++) {
    if ((sortedNumbers[i + 1] - sortedNumbers[i]) !== 1) {
      return sortedNumbers[i] + 1;
    }
  }
};

const main = () => {
  const boardingPasses = Deno.readTextFileSync("input.txt").split("\r\n");
  const seatNumbers = boardingPasses.map((x) => findSeatNumber(x));
  // console.log(Math.max(...seatNumbers), seatNumbers.join("\n"));
  console.log(getMySeatNumber(seatNumbers));
};

main();
