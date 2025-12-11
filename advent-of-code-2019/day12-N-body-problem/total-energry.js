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

// const findTotalEnergy = (positions, velocity) => {
//   let potentialEnergy = 0;
//   let kineticEnergy = 0;
//   let totalEnergy = 0;
//   for (let i = 0; i < 4; i++) {
//     potentialEnergy = Math.abs(positions[i].x) + Math.abs(positions[i].y) +
//       Math.abs(positions[i].z);
//     kineticEnergy = Math.abs(velocity[i].x) + Math.abs(velocity[i].y) +
//       Math.abs(velocity[i].z);
//     totalEnergy += potentialEnergy * kineticEnergy;
//   }
//   return totalEnergy;
// };

// const simulate = (positions, velocity, steps) => {
//   for (let i = 0; i < steps; i++) {
//     // console.log(i);
//     modifyVelocity(positions, velocity);
//     modifyPositions(positions, velocity);
//   }
//   // console.log(findPotentialEnergy(positions));
//   console.log(positions);
// };

const arePositionsEqual = (p1, p2, axis) => {
  let isEqual = true;
  for (let i = 0; i < 4; i++) {
    isEqual = isEqual && p1[i][axis] === p2[i][axis];
  }
  return isEqual;
};

const countSteps = (positions, velocity) => {
  let i = 0;
  const indexes = { x: -1, y: -1, z: -1 };
  let prevPositions = positions.map((x) => ({ ...x }));
  while (Object.values(indexes).includes(-1)) {
    modifyVelocity(positions, velocity);
    modifyPositions(positions, velocity);
    indexes.x =
      indexes.x === -1 && arePositionsEqual(prevPositions, positions, "x")
        ? i + 1
        : indexes.x;
    indexes.y =
      indexes.y === -1 && arePositionsEqual(prevPositions, positions, "y")
        ? i + 1
        : indexes.y;
    indexes.z =
      indexes.z === -1 && arePositionsEqual(prevPositions, positions, "z")
        ? i + 1
        : indexes.z;
    prevPositions = positions.map((x) => ({ ...x }));
    i++;
  }
  console.log(Object.values(indexes).reduce((product, x) => product * x, 1));
};

const positions = [
  { x: -1, y: 7, z: 3 },
  { x: 12, y: 2, z: -13 },
  { x: 14, y: 18, z: -8 },
  { x: 17, y: 4, z: -4 },
];

const velocity = [
  { x: 0, y: 0, z: 0 },
  { x: 0, y: 0, z: 0 },
  { x: 0, y: 0, z: 0 },
  { x: 0, y: 0, z: 0 },
];

countSteps(positions, velocity);
