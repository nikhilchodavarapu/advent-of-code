const getInput = () => {
  const input = Deno.readTextFileSync(`puzzle-input.txt`);
  return input.split('\n').map(x => +x);
}

const requiredFuel = (mass) => Math.floor(mass / 3) - 2;

export const part1 = () => {
  const masses = getInput();
  return masses.reduce((totalFuel, mass) => totalFuel += requiredFuel(mass), 0);
}

const requiredFuelPerMass = (mass) => {
  let currentMass = mass;
  let fuel = 0;
  while (currentMass > 0) {
    const currentFuel = requiredFuel(currentMass);
    fuel += currentFuel;
    currentMass = currentFuel;
  }
  return fuel;
}

export const part2 = () => {
  const masses = getInput();
  let totalRequiredFeul = 0;
  masses.forEach(mass => {
    totalRequiredFeul += requiredFuelPerMass(mass);
  });
  return totalRequiredFeul;
}
