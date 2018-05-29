import React from 'react';

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

export default LevelProvider;