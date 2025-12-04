const totalNumberOfOrbits = (mapOfOrbits) => {
  const orbits = mapOfOrbits.reduce((orbit, x) => {
    const [value, key] = x.split(')');
    orbit[key] = value;
    return orbit;
  }, {});
  return orbits;
}

const _countOrbits = (orbits) => {
  let count = 0;
  for (const element in orbits) {
    let key = element;
    while (orbits[key] !== undefined) {
      key = orbits[key];
      count++;
    }
  }
  return count;
}

const orbitsBwYouAndSan = (orbits) => {
  let count1 = 0;
  let count2 = 0;
  let key1 = "YOU";
  while (key1 !== undefined) {
    key1 = orbits[key1];
    count2 = 0;
    let key2 = "SAN";
    while (key2 !== undefined) {
      key2 = orbits[key2];
      if (key1 === key2) {
        return count1 + count2;
      }
      count2++;
    }
    count1++;
  }
  console.log("Hello")
  return count1 + count2;
}

const main = () => {
  const mapOfOrbits = Deno.readTextFileSync("input.txt").split("\n");
  const orbits = totalNumberOfOrbits(mapOfOrbits);
  const count = orbitsBwYouAndSan(orbits);
  console.log(count);
  return count;
}

main();