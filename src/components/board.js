/* @jsx createElement */
import React from 'react';
// eslint-disable-next-line
import { createElement } from 'glamor/react';
import map from '../utils/map';

import Tile from './tile';
import BlankTile from './blank-tile';

const Board = ({ size = 4, tiles, onClick, tileSize=90 }) => {
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

export default Board;