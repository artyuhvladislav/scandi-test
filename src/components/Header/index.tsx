import React from 'react';
import s from './header.module.scss';
import { Logo, SmallCart } from '../index';
import { CurrencyContainer } from '../../containers';
import NavigationContainer from '../../containers/NavigationContainer';

class Header extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <NavigationContainer />
        <Logo />
        <div className={s.info}>
          <CurrencyContainer />
          <SmallCart />
        </div>
      </div>
    );
  }
}

export default Header;
