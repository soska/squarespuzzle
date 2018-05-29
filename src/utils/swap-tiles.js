const swapTiles = (tiles, a, b) => {
  const nextTiles = [...tiles];
  const temp = nextTiles[a];
  nextTiles[a] = nextTiles[b];
  nextTiles[b] = temp;
  return nextTiles;
};

export default swapTiles;