// const positions = [];
// let x = 0;
// let y = 0;
// map.split("").forEach((element) => {
//   if (element === "#") positions.push({x, y});
//   x++;
//   if (element === "\n") {
//     y++;
//     x = 0;
//   }

import { maxBy } from "jsr:@std/collections/max-by";

// });
const getAsteroidPositions = (map) => {
  const positions = [];
  const splittedMap = map.split("\n").map((x) => x.split(""));
  for (let i = 0; i < splittedMap.length; i++) {
    for (let j = 0; j < splittedMap[i].length; j++) {
      if (splittedMap[i][j] === "#") {
        positions.push({ x: j, y: i });
      }
    }
  }
  return positions;
};

const gcdOf = (x, y) => x === 0 ? y : gcdOf(y % x, x);
const distanceOf = (p1, p2) =>
  Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

const noOfVisibleAstroids = (station, asteroidPositions) => {
  const reducedPositions = {};
  asteroidPositions.forEach((position) => {
    const dx = position.x - station.x;
    const dy = position.y - station.y;
    const gcd = dx < dy
      ? gcdOf(Math.abs(dx), Math.abs(dy))
      : gcdOf(Math.abs(dy), Math.abs(dx));
    const rx = dx / gcd;
    const ry = dy / gcd;
    const reducedPos = rx + "," + ry;
    if (!isNaN(rx)) {
      if (reducedPositions[reducedPos]) {
        if (
          distanceOf(station, position) <
            distanceOf(station, reducedPositions[reducedPos])
        ) {
          reducedPositions[reducedPos] = position;
        }
      } else reducedPositions[reducedPos] = position;
    }
  });
  return [station, reducedPositions, Object.keys(reducedPositions).length];
};

const orderedVectors = (station, visibleAstroids) => {
  const vectors = {
    UP: [],
    UP_RIGHT: [],
    RIGHT: [],
    DOWN_RIGHT: [],
    DOWN: [],
    DOWN_LEFT: [],
    LEFT: [],
    UP_LEFT: [],
  };
  visibleAstroids.forEach((astroid) => {
    const dx = astroid.x - station.x;
    const dy = astroid.y - station.y;
    if (dx === 0 && dy < 0) vectors.UP.push({ ...astroid });
    if (dx > 0 && dy < 0) {
      vectors.UP_RIGHT.push({ ...astroid, tilt: (dx / (-dy)) });
    }
    if (dx > 0 && dy === 0) vectors.RIGHT.push({ ...astroid });
    if (dx > 0 && dy > 0) {
      vectors.DOWN_RIGHT.push({ ...astroid, tilt: (dx / dy) });
    }
    if (dx === 0 && dy > 0) vectors.DOWN.push({ ...astroid });
    if (dx < 0 && dy > 0) {
      vectors.DOWN_LEFT.push({ ...astroid, tilt: ((-dx) / dy) });
    }
    if (dx < 0 && dy === 0) vectors.LEFT.push({ ...astroid });
    if (dx < 0 && dy < 0) vectors.UP_LEFT.push({ ...astroid, tilt: ((-dx) / (-dy)) });
  });

  let orderedAsteroids = [];
  orderedAsteroids = orderedAsteroids.concat(vectors.UP)
  orderedAsteroids = orderedAsteroids.concat(vectors.UP_RIGHT.toSorted((a, b) => a.tilt - b.tilt))
  orderedAsteroids = orderedAsteroids.concat(vectors.RIGHT)
  orderedAsteroids = orderedAsteroids.concat(vectors.DOWN_RIGHT.toSorted((a, b) => a.tilt - b.tilt))
  orderedAsteroids = orderedAsteroids.concat(vectors.DOWN)
  orderedAsteroids = orderedAsteroids.concat(vectors.DOWN_LEFT.toSorted((a, b) => a.tilt - b.tilt))
  orderedAsteroids = orderedAsteroids.concat(vectors.LEFT)
  orderedAsteroids = orderedAsteroids.concat(vectors.UP_LEFT.toSorted((a, b) => b.tilt - a.tilt))

  console.log(orderedAsteroids.map(x => x.x + " " + x.y).slice(150, 180).join('\n'))
  return orderedAsteroids;
};

const vaporize = (station, visibleAstroids, count, asteroidPositions) => {
  // console.log(visibleAstroids);

  let orderedAsteroids = orderedVectors(station, [...visibleAstroids]);
  console.log(orderedAsteroids[count- 1])
  let currentVaporisedOne = {};
  let remainingAsteroids = count;
  let i = 0;
  while (i < remainingAsteroids) {
    const index = visibleAstroids.findIndex((astroid) =>
      orderedAsteroids[i].x === astroid.x && orderedAsteroids[i].y === astroid.y
    );
    currentVaporisedOne = { ...orderedAsteroids[i] };
    // const apIndex = asteroidPositions.findIndex((astroid) =>
    //   orderedAsteroids[i].x === astroid.x && orderedAsteroids[i].y === astroid.y
    // );
    visibleAstroids.splice(index, 1);
    // asteroidPositions.splice(apIndex, 1);
    if (visibleAstroids.length === 0) {
      console.log("Hello");
      visibleAstroids.push(
        ...Object.values(noOfVisibleAstroids(station, asteroidPositions)[1]),
      );
      orderedAsteroids = orderedVectors(station, visibleAstroids);
      remainingAsteroids = count - i;
      i = -1;
    }
    i++;
  }
  console.log(visibleAstroids.length);
  console.log(
    currentVaporisedOne,
    currentVaporisedOne.x * 100 + currentVaporisedOne.y,
  );

  console.log(visibleAstroids);
};

const bestLocation = (map) => {
  const visibleAstroids = [];
  const asteroidPositions = getAsteroidPositions(map);
  asteroidPositions.forEach((position) => {
    visibleAstroids.push(noOfVisibleAstroids(position, asteroidPositions));
  });
  // return Math.max(...visibleAstroids.map((x) => x[1]));

  const monitorStation = maxBy(visibleAstroids, (x) => x[2]);
  vaporize(
    monitorStation[0],
    Object.values(monitorStation[1]),
    200,
    asteroidPositions,
  );
  console.log(monitorStation[2]);
};

const main = () => {
  const map = Deno.readTextFileSync("input.txt");
  const detectedAsteroids = bestLocation(map);
  console.log(detectedAsteroids);
  return detectedAsteroids;
};

main();
