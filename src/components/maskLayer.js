import React, {Component} from 'react';

class MaskLayer extends Component {
  render() {
    return (
      <div style={{
        background: '#000',
        opacity: 0.68,
        width: '100%',
        height: '100%',
        position: 'fixed',
        left: 0,
        top: 0,
        overflow: 'hidden'
      }}
      />
    );
  }
}

export default MaskLayer;
