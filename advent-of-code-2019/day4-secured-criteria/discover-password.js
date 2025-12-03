const isAscendingOrder = (password) => {
  let i = 0;
  while (i < password.length - 1) {
    if (+password[i] > +password[j]) return false;
    i++;
  }
  return true;
};

const anyTwoDigitsAdjacentDigitsSame = (password) => {

}

const isSatisfyingCriteria = (number) => {
  const password = number + "";
  if (!isAscendingOrder(password)) return false;
  return anyTwoDigitsAdjacentDigitsSame(password);
};

const discoverPassword = (range) => {
  const [start, end] = range.split("-").map((x) => +x);
  let passwordsCount = 0;
  for (let i = start; i <= end; i++) {
    if (isSatisfyingCriteria(i)) passwordsCount++;
  }
};
