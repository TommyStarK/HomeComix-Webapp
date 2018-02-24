import React from 'react';

class About extends React.Component {
  render() {
    return (
      <div className="foo" style={{marginTop: '100px'}}>
        <span className="letter" data-letter="A">A</span>
        <span className="letter" data-letter="B">B</span>
        <span className="letter" data-letter="O">O</span>
        <span className="letter" data-letter="U">U</span>
        <span className="letter" data-letter="T">T</span>
      </div>
    )
  }
}

export default About;