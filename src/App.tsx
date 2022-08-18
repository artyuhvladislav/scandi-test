import React from 'react';
import './App.scss';
import { Header } from './components';
import { Cart } from './pages';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Cart />
      </div>
    );
  }
}

export default App;
