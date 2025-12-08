// const positions = [
//   { x: 8, y: -17, z: 0 },
//   { x: 52, y:5 z: -10 },
//   { x: 24, y: 78, z:3-8 },
//   { x: 97, y:-84, z:-34 },
// ];

// const velocity = [
//   { x: 0, y: 0, z: 0 },
//   { x: 0, y: 0, z: 0 },
//   { x: 0, y: 0, z: 0 },
//   { x: 0, y: 0, z: 0 },
// ];

let positions = [
  { x: 8, y: -10, z: 0 },
  { x: 5, y: 5, z: 10 },
  { x: 2, y: -7, z: 3 },
  { x: 9, y: -8, z: -3 },
];

let velocity = [
  { x: 0, y: 0, z: 0 },
  { x: 0, y: 0, z: 0 },
  { x: 0, y: 0, z: 0 },
  { x: 0, y: 0, z: 0 },
];

const isMoreOrLess = (x, y) => x < y ? +1 : x > y ? -1 : 0;

const incrementVelocity = (position1, position2, velocity) => {
  velocity.x += isMoreOrLess(position1.x, position2.x);
  velocity.y += isMoreOrLess(position1.y, position2.y);
  velocity.z += isMoreOrLess(position1.z, position2.z);
};

const modifyVelocity = (positions, velocity) => {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      incrementVelocity(positions[i], positions[j], velocity[i]);
    }
  }
};

const modifyPositions = (positions, velocity) => {
  for (let i = 0; i < 4; i++) {
    positions[i].x += velocity[i].x;
    positions[i].y += velocity[i].y;
    positions[i].z += velocity[i].z;
  }
};

const findTotalEnergy = (positions, velocity) => {
  let potentialEnergy = 0;
  let kineticEnergy = 0;
  let totalEnergy = 0;
  for (let i = 0; i < 4; i++) {
    potentialEnergy = Math.abs(positions[i].x) + Math.abs(positions[i].y) +
      Math.abs(positions[i].z);
    kineticEnergy = Math.abs(velocity[i].x) + Math.abs(velocity[i].y) +
      Math.abs(velocity[i].z);
    totalEnergy += potentialEnergy * kineticEnergy;
  }
  return totalEnergy;
};

const simulate = (positions, velocity, steps) => {
  for (let i = 0; i < steps; i++) {
    console.log(i)
    modifyVelocity(positions, velocity);
    modifyPositions(positions, velocity);
  }
  console.log(findTotalEnergy(positions, velocity));
  console.log(positions)
};

const arePositionsEqual = (p1, p2) => {
  let isEqual = true;
  for (let i = 0; i < 4; i++) {
    isEqual = p1[i].x === p2[i].x && p1[i].y === p2[i].y && p1[i].z === p2[i].z;
  }
  return isEqual;
};

const countSteps = (positions, velocity) => {
  let prevPosition = positions.map((x) => ({ ...x }));
  let steps = 0;
  modifyVelocity(positions, velocity);
  modifyPositions(positions, velocity);
  while (!arePositionsEqual(positions, velocity)) {
    prevPosition = positions.map((x) => ({ ...x }));
    modifyVelocity(positions, velocity);
    modifyPositions(positions, velocity);
    steps++;
  }
  console.log(steps)
};

simulate(positions, velocity, 2343387462)

// simulate(positions, velocity, 1382);
//  positions = [
//   { x: 8, y: -10, z: 0 },
//   { x: 5, y: 5, z: 10 },
//   { x: 2, y: -7, z: 3 },
//   { x: 9, y: -8, z: -3 },
// ];

//  velocity = [
//   { x: 0, y: 0, z: 0 },
//   { x: 0, y: 0, z: 0 },
//   { x: 0, y: 0, z: 0 },
//   { x: 0, y: 0, z: 0 },
// ];

// simulate(positions, velocity, 1383);
//  positions = [
//   { x: 8, y: -10, z: 0 },
//   { x: 5, y: 5, z: 10 },
//   { x: 2, y: -7, z: 3 },
//   { x: 9, y: -8, z: -3 },
// ];

//  velocity = [
//   { x: 0, y: 0, z: 0 },
//   { x: 0, y: 0, z: 0 },
//   { x: 0, y: 0, z: 0 },
//   { x: 0, y: 0, z: 0 },
// ];
// simulate(positions, velocity, 1384);
//  positions = [
//   { x: 8, y: -10, z: 0 },
//   { x: 5, y: 5, z: 10 },
//   { x: 2, y: -7, z: 3 },
//   { x: 9, y: -8, z: -3 },
// ];

//  velocity = [
//   { x: 0, y: 0, z: 0 },
//   { x: 0, y: 0, z: 0 },
//   { x: 0, y: 0, z: 0 },
//   { x: 0, y: 0, z: 0 },
// ];

// simulate(positions, velocity, 1385);
//  positions = [
//   { x: 8, y: -10, z: 0 },
//   { x: 5, y: 5, z: 10 },
//   { x: 2, y: -7, z: 3 },
//   { x: 9, y: -8, z: -3 },
// ];

//  velocity = [
//   { x: 0, y: 0, z: 0 },
//   { x: 0, y: 0, z: 0 },
//   { x: 0, y: 0, z: 0 },
//   { x: 0, y: 0, z: 0 },
// ];
// simulate(positions, velocity, 1386)
//  positions = [
//   { x: 8, y: -10, z: 0 },
//   { x: 5, y: 5, z: 10 },
//   { x: 2, y: -7, z: 3 },
//   { x: 9, y: -8, z: -3 },
// ];

//  velocity = [
//   { x: 0, y: 0, z: 0 },
//   { x: 0, y: 0, z: 0 },
//   { x: 0, y: 0, z: 0 },
//   { x: 0, y: 0, z: 0 },
// ];
// simulate(positions, velocity, 1387)
//  positions = [
//   { x: 8, y: -10, z: 0 },
//   { x: 5, y: 5, z: 10 },
//   { x: 2, y: -7, z: 3 },
//   { x: 9, y: -8, z: -3 },
// ];

//  velocity = [
//   { x: 0, y: 0, z: 0 },
//   { x: 0, y: 0, z: 0 },
//   { x: 0, y: 0, z: 0 },
//   { x: 0, y: 0, z: 0 },
// ];
// simulate(positions, velocity, 1388)
//  positions = [
//   { x: 8, y: -10, z: 0 },
//   { x: 5, y: 5, z: 10 },
//   { x: 2, y: -7, z: 3 },
//   { x: 9, y: -8, z: -3 },
// ];

//  velocity = [
//   { x: 0, y: 0, z: 0 },
//   { x: 0, y: 0, z: 0 },
//   { x: 0, y: 0, z: 0 },
//   { x: 0, y: 0, z: 0 },
// ];
// simulate(positions, velocity, 1389)
//  positions = [
//   { x: 8, y: -10, z: 0 },
//   { x: 5, y: 5, z: 10 },
//   { x: 2, y: -7, z: 3 },
//   { x: 9, y: -8, z: -3 },
// ];

//  velocity = [
//   { x: 0, y: 0, z: 0 },
//   { x: 0, y: 0, z: 0 },
//   { x: 0, y: 0, z: 0 },
//   { x: 0, y: 0, z: 0 },
// ];
// simulate(positions, velocity, 1390)
//  positions = [
//   { x: 8, y: -10, z: 0 },
//   { x: 5, y: 5, z: 10 },
//   { x: 2, y: -7, z: 3 },
//   { x: 9, y: -8, z: -3 },
// ];

//  velocity = [
//   { x: 0, y: 0, z: 0 },
//   { x: 0, y: 0, z: 0 },
//   { x: 0, y: 0, z: 0 },
//   { x: 0, y: 0, z: 0 },
// ];
// simulate(positions, velocity, 1391)
//  positions = [
//   { x: 8, y: -10, z: 0 },
//   { x: 5, y: 5, z: 10 },
//   { x: 2, y: -7, z: 3 },
//   { x: 9, y: -8, z: -3 },
// ];

//  velocity = [
//   { x: 0, y: 0, z: 0 },
//   { x: 0, y: 0, z: 0 },
//   { x: 0, y: 0, z: 0 },
//   { x: 0, y: 0, z: 0 },
// ];
// simulate(positions, velocity, 1392)