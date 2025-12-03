const isAscendingOrder = (password) => {
  let i = 0;
  while (i < password.length - 1) {
    if (+password[i] > +password[i + 1]) return false;
    i++;
  }
  return true;
};

const _anyTwoDigitsAdjacentDigitsSame = (password) => {
  let i = 0;
  while (i < password.length - 1) {
    if (+password[i] === +password[i + 1]) return true;
    i++;
  }
  return false;
};

const onlyAnyTwoDigitsAdjacentDigitsSame = (password) => {
  let i = 0;
  let areOnlyTwoEqual = false;
  while (i < password.length - 1) {
    if (+password[i] === +password[i + 1]) {
      if (+password[i] === +password[i + 2]) {
        areOnlyTwoEqual = false;
        i++;
        while (+password[i] === +password[i + 1]) i++;
      } else return true;
    }
    i++;
  }
  return areOnlyTwoEqual;
};

const isSatisfyingCriteria = (number) => {
  const password = number + "";
  if (!isAscendingOrder(password)) return false;
  return onlyAnyTwoDigitsAdjacentDigitsSame(password);
};

const discoverPassword = (range) => {
  const [start, end] = range.split("-").map((x) => +x);
  let passwordsCount = 0;
  for (let i = start; i <= end; i++) {
    if (isSatisfyingCriteria(i)) passwordsCount++;
  }
  return passwordsCount;
};

console.log(discoverPassword("125730-579381"));
