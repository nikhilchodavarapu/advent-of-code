const entrance = (map) => {
  const position = map.reduce((pos, row, i) => {
    if (row.includes("@")) {
      pos.x = row.indexOf("@");
      pos.y = i;
    }
    return pos;
  }, {});
  return position;
}
const collectKeys = () => {
  const map = `#########\n#b.A.@.a#\n#########`.split("\n").map((x) =>
    x.split("")
  );
  const startingPos = entrance(map);
};
