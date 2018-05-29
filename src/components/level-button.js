/*eslint jsx-a11y/href-no-hash:"off"*/
/* @jsx createElement */
import React from 'react';
// eslint-disable-next-line
import { createElement } from 'glamor/react';

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

export default LevelButton;