/* @jsx createElement */
import React from 'react';
// eslint-disable-next-line
import { createElement } from 'glamor/react';

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

export default BlankTile;