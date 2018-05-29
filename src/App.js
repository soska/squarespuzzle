/* @jsx createElement */
import React from 'react';
// eslint-disable-next-line
import { createElement } from 'glamor/react';

import Game from './components/game';
import LevelProvider from './components/level-provider';
import LevelButton from './components/level-button';


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
