import React, { Component } from 'react';
import './App.css';
import BackNext from 'backnext/BackNext';

class App extends Component<any, any> {
  constructor(props : any) {
    super(props);
    this.state = {hasClickedButton: false};
  }

  goToBackNext() {
    this.setState({hasClickedButton: true});
  }

  firstPage = (
    <div className='App'>
        <button className='Index-button' onClick={this.goToBackNext.bind(this)}>
          Start
        </button>
    </div>
  );
  
  render() {
    if (this.state.hasClickedButton) {
      return <BackNext />;
    } else {
      return this.firstPage;
    }
  }
}

export default App;