/* @jsx createElement */
import React from 'react';
// eslint-disable-next-line
import { createElement } from 'glamor/react';

const WonTitle = ({onClick}) => {
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
      onClick={e=> {e.preventDefault(); onClick()}}
    >
      <span>You Won</span>
    </h1>
  );
};

export default WonTitle;