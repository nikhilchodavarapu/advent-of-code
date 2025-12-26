const isAlNum = (value, length) => {
  if (length === 9) {
    return value.length === length &&
      value.split("").every((x) => /^[0-9]$/.test(x));
  }
  return value.length === length &&
    value.split("").every((x) => /^[a-f0-9]$/.test(x));
};

const isValid = (fields) => {
  const valid = {
    byr: { length: 4, least: 1920, most: 2002 },
    iyr: { length: 4, least: 2010, most: 2020 },
    eyr: { length: 4, least: 2020, most: 2030 },

    hgt: { cm: { least: 150, most: 193 }, in: { least: 59, most: 76 } },
    hcl: { start: "#", length: 6 },
    ecl: ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"],
    pid: { length: 9 },
  };

  const keys = Object.keys(fields);
  if (keys.length === 8 || (keys.length === 7 && !keys.includes("cid"))) {
    let value = fields.byr.trim();
    if (
      value.length !== 4 || +value < valid.byr.least || +value > valid.byr.most
    ) return false;
    value = fields.iyr.trim();
    if (
      value.length !== 4 || +value < valid.iyr.least || +value > valid.iyr.most
    ) return false;
    value = fields.eyr.trim();
    if (
      value.length !== 4 || +value < valid.eyr.least || +value > valid.eyr.most
    ) return false;
    value = fields.hgt.trim();
    const end = value.slice(-2);
    const height = +value.slice(0, -2);
    if (!Object.keys(valid.hgt).includes(end)) return false;
    if (valid.hgt[end].most < height || valid.hgt[end].least > height) {
      return false;
    }
    value = fields.hcl.trim();
    if (value[0] !== "#" || !isAlNum(value.slice(1), 6)) return false;
    value = fields.ecl.trim();
    if (!valid.ecl.includes(value)) return false;
    value = fields.pid.trim();
    if (!isAlNum(value, 9)) return false;
  }
  if (keys.length < 7 || (keys.length === 7 && keys.includes("cid"))) {
    return false;
  }
  return true;
};

const countValidPassports = (batches) => {
  let count = 0;
  batches.forEach((batch) => {
    const fields = batch.split(/\n| /).reduce((fields, x) => {
      const [key, val] = x.split(":");
      fields[key] = val;
      return fields;
    }, {});
    if (isValid(fields)) console.log(fields);
    count += isValid(fields) ? 1 : 0;
  });
  return count;
};

const main = () => {
  const batches = Deno.readTextFileSync("input.txt").split("\r\n\r\n");
  // console.log(batches)
  console.log(countValidPassports(batches));
};

main();
