/* @jsx createElement */
import React from 'react';
// eslint-disable-next-line
import { createElement } from 'glamor/react';

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

export default Tile;