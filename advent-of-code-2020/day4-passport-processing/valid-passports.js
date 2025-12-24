const isAlldigits = (value) => {
  const numbers;
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
    let value = fields.byr;
    if (
      value.length !== 4 || +value < valid.byr.least || +value > valid.byr.most
    ) return false;
    value = fields.iyr;
    if (
      value.length !== 4 || +value < valid.iyr.least || +value > valid.iyr.most
    ) return false;
    value = fields.eyr;
    if (
      value.length !== 4 || +value < valid.eyr.least || +value > valid.eyr.most
    ) return false;
  }
  return false;
};

const countValidPassports = (batches) => {
  let count = 0;
  batches.forEach((batch) => {
    const fields = batch.split(/\n| /).reduce((fields, x) => {
      const [key, val] = x.split(":");
      fields[key] = val;
      return fields;
    }, {});
    count += isValid(fields) ? 1 : 0;
  });
  return count;
};

const main = () => {
  const batches = Deno.readTextFileSync("input.txt").split("\n\n");
  console.log(countValidPassports(batches));
};

main();
