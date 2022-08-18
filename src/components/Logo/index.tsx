import React from 'react';
import { Link } from 'react-router-dom';
import { logo } from '../../assets/icons';

class Logo extends React.Component {
  render() {
    return (
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
    );
  }
}

export default Logo;
