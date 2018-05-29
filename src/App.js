/*
 * Sorry for the big file.
 *
 *
 */
import React, { Fragment } from 'react';
import { createElement } from 'glamor/react';
import Keyboard from 'react-keyboardist';
/* @jsx createElement */

const map = (n, start1, stop1, start2, stop2) => {
  return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
};

const isArraySorted = arr => {
  for (var i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false;
    }
  }

  return true;
};

const range = n => {
  return [...Array(n).keys()];
};

const tileSize = 90;

const swapTiles = (tiles, a, b) => {
  const nextTiles = [...tiles];
  const temp = nextTiles[a];
  nextTiles[a] = nextTiles[b];
  nextTiles[b] = temp;
  return nextTiles;
};

const generateTiles = size => [...range(size * size - 1), null];

const [UP, DOWN, LEFT, RIGHT] = ['UP', 'DOWN', 'LEFT', 'RIGHT'];

const randomMoves = n => {
  const directions = [UP, DOWN, LEFT, RIGHT];
  const moves = [];
  for (let i = 0; i <= n; i++) {
    moves.push(directions[Math.floor(Math.random() * directions.length)]);
  }
  return moves;
};

const Tile = ({ size, tile, color, onClick }) => (
  <div
    css={{
      width: `${size}px`,
      height: `${size}px`,
      color: 'white',
      float: 'left',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '24px',
      boxShadow: 'rgba(255,255,255,.5) 1px 2px 0 inset',
      cursor: 'pointer',
    }}
    onClick={e => {
      e.preventDefault();
      onClick(tile);
    }}
    style={{
      background: color,
    }}
  >
    <span
      css={{
        textShadow: 'rgba(0,0,0,.25) 0 2px 2px',
      }}
    >
      {tile + 1}
    </span>
  </div>
);

const BlankTile = ({ size }) => (
  <div
    css={{
      width: `${size}px`,
      height: `${size}px`,
      float: 'left',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'orangered',
      fontSize: '24px',
      boxShadow: 'rgba(0,0,0,.5) 1px 2px 11px inset',
    }}
  />
);

const Board = ({ size = 4, tiles, onClick }) => {
  const max = tiles.length - 1;
  return (
    <div
      css={{
        width: `${size * tileSize}px`,
        height: `${size * tileSize}px`,
        padding: '22px',
        background: 'tomato',
        borderRadius: `6px`,
        boxShadow: 'rgba(0,0,0,.5) 1px 2px 11px ',
      }}
    >
      {tiles.map(
        (tile, index) =>
          tile === null ? (
            <BlankTile key={`${index}`} size={tileSize} />
          ) : (
            <Tile
              key={`${index}`}
              size={tileSize}
              tile={tile}
              color={`hsla(${map(tile, 0, max, 120, 320)},30%,75%,1)`}
              onClick={onClick}
            />
          )
      )}
    </div>
  );
};

const WonTitle = () => {
  return (
    <h1
      css={{
        position: 'fixed',
        top: '45vh',
        left: '0',
        margin: 0,
        width: '100%',
        padding: '3vh',
        color: 'tomato',
        textAlign: 'center',
        background: 'rgba(20, 10,50, 0.75)',
        fontSize: '42px',
        fontWeight: '200',
        letterSpacing: '0.25rem',
      }}
    >
      <span>You Won</span>
    </h1>
  );
};

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
        {won && <WonTitle />}
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

class LevelProvider extends React.Component {
  static defaultProps = {
    defaultLevel: 3,
  };

  state = {
    level: this.props.defaultLevel,
  };

  setLevel = level => {
    this.setState({ level });
  };

  render() {
    return this.props.render({
      level: this.state.level,
      setLevel: this.setLevel,
    });
  }
}

const LevelButton = ({ level, label, selected, onClick }) => (
  <a
    href="#"
    onClick={e => {
      e.preventDefault();
      onClick(level);
    }}
    css={{
      textDecoration: 'none',
      padding: '11px 22px',
      flex: 1,
      margin: '11px',
      fontSize: '14px',
      textTransform: 'uppercase',
      color: selected === level ? 'papayawhip' : 'rgba(255,255,255,.3)',
    }}
  >
    {label}
  </a>
);

const App = () => {
  return (
    <LevelProvider
      defaultLevel={3}
      render={({ level, setLevel }) => {
        return (
          <div
            css={{
              background: '#556677',
              position: 'fixed',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <div
              css={{
                padding: '22px',
                color: '#9aa',
                fontSize: '13px',
              }}
            >
              Use ← · ↑ · → · ↓ to rearrange the tiles. SPACE to reset.
            </div>
            <Game size={level} />
            <div css={{ display: 'flex' }}>
              <LevelButton
                level={3}
                selected={level}
                onClick={setLevel}
                label={'easy'}
              />
              <LevelButton
                level={4}
                selected={level}
                onClick={setLevel}
                label={'medium'}
              />
              <LevelButton
                level={5}
                selected={level}
                onClick={setLevel}
                label={'hard'}
              />
            </div>
            <div className="footer">
              Built on a weekend by{' '}
              <a href="https://armandososa.org">Armando Sosa</a> with React and{' '}
              <a href="https://github.com/soska/react-keyboardist">
                React Keyboardist
              </a>.{' '}
              <a href="https://github.com/soska/react-keyboardist">
                Source &rarr;
              </a>
            </div>
          </div>
        );
      }}
    />
  );
};

export default App;
