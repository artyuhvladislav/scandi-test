import React from 'react';
import s from './header.module.scss';
import { Navigation, Logo, Currency, Cart } from '../index';
// import { ButtonPropsType, ButtonSizeEnum, ButtonTypeEnum, ButtonVariantEnum } from './Header.type';

class Header extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div className={s.root}>
        <Navigation />
        <Logo />
        <div className={s.info}>
          <Currency />
          <Cart />
        </div>
      </div>
    );
  }
}

export default Header;
