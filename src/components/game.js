/* @jsx createElement */
import React, { Fragment } from 'react';
// eslint-disable-next-line
import { createElement } from 'glamor/react';
import Keyboard from 'react-keyboardist';
import isArraySorted from '../utils/is-array-sorted';
import swapTiles from '../utils/swap-tiles';
import generateTiles from '../utils/generate-tiles';
import randomMoves from '../utils/random-moves';
import {UP, DOWN, LEFT, RIGHT} from '../utils/constants'

import Board from './board';
import WonTitle from './won-title';


class Game extends React.Component {
  static defaultProps = {
    size: 4,
  };

  constructor(props) {
    super(props);
    const tiles = generateTiles(props.size);
    this.state = {
      tiles,
      started: false,
      blankIndex: tiles.length - 1,
    };
  }

  componentDidMount() {
    this.shuffle();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.size !== this.props.size) {
      this.reset(nextProps.size);
    }
  }

  shuffle() {
    const moves = [
      DOWN,
      RIGHT,
      DOWN,
      RIGHT,
      DOWN,
      RIGHT,
      ...randomMoves((this.props.size ^ 2) * 10),
    ];
    this.move(moves).then(() => {
      this.setState({ started: true });
    });
  }

  reset = (size = null) => {
    if (size === null) {
      size = this.props.size;
    }
    console.log(size);
    const tiles = generateTiles(size);
    this.setState({ tiles, started: false }, this.shuffle);
  };

  indexToPosition = index => {
    const { size } = this.props;
    const x = index % size;
    const y = Math.floor(index / size);
    return { x, y };
  };

  positionToIndex = ({ x, y }) => {
    const { size } = this.props;
    return x + size * y;
  };

  getNextIndex = (currentIndex, direction = DOWN) => {
    const maxIndex = this.props.size - 1;
    let position = this.indexToPosition(currentIndex);

    switch (direction) {
      case UP: {
        if (position.y < maxIndex) {
          position.y += 1;
        }
        break;
      }
      case DOWN: {
        if (position.y > 0) {
          position.y -= 1;
        }
        break;
      }
      case LEFT: {
        if (position.x < maxIndex) {
          position.x += 1;
        }
        break;
      }
      case RIGHT: {
        if (position.x > 0) {
          position.x -= 1;
        }
        break;
      }
      default:
    }

    const nextIndex = this.positionToIndex(position);

    return nextIndex;
  };

  mover = direction => () => {
    this.move([direction]);
  };

  move = directions =>
    new Promise(resolve => {
      let nextTiles = [...this.state.tiles];
      let nextBlankIndex;

      directions.forEach(direction => {
        let blankIndex = nextTiles.indexOf(null);
        nextBlankIndex = this.getNextIndex(blankIndex, direction);
        nextTiles = swapTiles(nextTiles, blankIndex, nextBlankIndex);
      });

      this.setState(
        {
          tiles: nextTiles,
        },
        resolve
      );
    });

  onTileClick = tile => {
    const tileIndex = this.state.tiles.indexOf(tile);
    const tilePosition = this.indexToPosition(tileIndex);
    const blankIndex = this.state.tiles.indexOf(null);
    const blankPosition = this.indexToPosition(blankIndex);

    let distance;

    console.log({ tilePosition, blankPosition });

    // same row
    if (blankPosition.y === tilePosition.y) {
      distance = blankPosition.x - tilePosition.x;
      if (distance === 1) {
        this.move([RIGHT]);
      }
      if (distance === -1) {
        this.move([LEFT]);
      }
    } else if (blankPosition.x === tilePosition.x) {
      distance = blankPosition.y - tilePosition.y;
      if (distance === 1) {
        this.move([DOWN]);
      }
      if (distance === -1) {
        this.move([UP]);
      }
    }
  };

  checkWinCondition() {
    const { tiles, started } = this.state;

    if (!started) {
      return false;
    }

    // game is only won if the blank tile is at the uper left corner, or the bottom right
    if (tiles[0] !== null && tiles[tiles.length - 1] !== null) {
      return false;
    }

    const nonNullTiles = tiles.filter(n => n !== null);

    return isArraySorted(nonNullTiles);
  }

  render() {
    window.Game = this;
    const { tiles } = this.state;
    const won = this.checkWinCondition();
    return (
      <Fragment>
        {won && <WonTitle onClick={this.reset}/>}
        <Keyboard
          bindings={{
            space: this.reset,
          }}
        />
        {!won && (
          <Keyboard
            bindings={{
              up: this.mover(UP),
              left: this.mover(LEFT),
              right: this.mover(RIGHT),
              down: this.mover(DOWN),
            }}
          />
        )}
        <Board
          tiles={tiles}
          size={this.props.size}
          onClick={this.onTileClick}
        />
      </Fragment>
    );
  }
}


export default Game;