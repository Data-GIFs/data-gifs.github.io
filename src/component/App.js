import React from 'react';
import style from '../css/App.module.scss';
import Navigation from './Navigation';
import Home from './Home';
import Space from './Space';
import Study from './Study';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      pages: [<Home/>, <Space/>, <Study/>]
    };
  }

  switchPage = (index) => {
    if (index !== this.state.current) {
      this.setState({ current: index });
      // scroll to top
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
  }
  
  renderPage() {
    let current = this.state.current
    return this.state.pages[current]
  }

  render() {
    return (
      <div className={style.container}>
        <Navigation onSwitchPage={this.switchPage} />
        {this.renderPage()}
      </div>
    );
  }
}

export default App;
