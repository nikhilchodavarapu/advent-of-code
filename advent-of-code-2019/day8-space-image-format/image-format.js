import { chunk } from "jsr:@std/collections";

const countDigit = (layer, digit) => {
  let count = 0;
  layer.forEach((element) => {
    count += element === digit ? 1 : 0;
  });
  return count;
};

const _formatImage = (wide, tall, imageData) => {
  const chunkSize = wide * tall;
  const layers = chunk(imageData, chunkSize);
  console.log(layers);
  let minZeroes = Infinity;
  let layerWithMinZeros = [];
  layers.forEach((layer) => {
    const zeroesCount = countDigit(layer, "0");
    if (minZeroes > zeroesCount) {
      layerWithMinZeros = layer;
      minZeroes = zeroesCount;
    }
  });
  return countDigit(layerWithMinZeros, "1") *
    countDigit(layerWithMinZeros, "2");
};

const getCorrespondingPixel = (index, layers) => {
  let i = 0;
  while (i < layers.length && layers[i][index] === "2") i++;
  return layers[i][index];
}

const _decodeImage = (wide, tall, imageData) => {
  const chunkSize = wide * tall;
  const layers = chunk(imageData, chunkSize);
  const image = [];
  for (let i = 0; i < chunkSize; i++) {
    const symbol = getCorrespondingPixel(i, layers) === "1" ? '✅' : '📉';
    image.push(symbol)
  }
  const decodedImage = chunk(image, wide).map(x=> x.join(" "));
  console.log(decodedImage.join("\n"));
}