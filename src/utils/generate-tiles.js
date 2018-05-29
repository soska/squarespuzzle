import range from './range';
const generateTiles = size => [...range(size * size - 1), null];

export default generateTiles;