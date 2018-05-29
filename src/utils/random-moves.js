import {UP, DOWN, LEFT, RIGHT} from './constants'

const randomMoves = n => {
  const directions = [UP, DOWN, LEFT, RIGHT];
  const moves = [];
  for (let i = 0; i <= n; i++) {
    moves.push(directions[Math.floor(Math.random() * directions.length)]);
  }
  return moves;
};

export default randomMoves;