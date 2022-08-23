import React from 'react';
import s from './header.module.scss';
import { Navigation, Logo, Currency, Cart } from '../index';
import { CurrencyContainer } from '../../containers';
import NavigationContainer from '../../containers/NavigationContainer';
// import { ButtonPropsType, ButtonSizeEnum, ButtonTypeEnum, ButtonVariantEnum } from './Header.type';

class Header extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div className={s.root}>
        <NavigationContainer />
        <Logo />
        <div className={s.info}>
          <CurrencyContainer />
          <Cart />
        </div>
      </div>
    );
  }
}

export default Header;
