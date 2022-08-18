import React from 'react';
import { cart } from '../../assets/icons';
import s from './cart.module.scss';
import { CartPropsI, CartStateI } from './Cart.type';

class Cart extends React.Component<CartPropsI, CartStateI> {
  state = {
    isOpen: false,
  };

  toggleListVisibility = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  toggleCartVisibility = () => {};

  render() {
    return (
      <div className={s.root} onClick={this.toggleCartVisibility}>
        <img src={cart} alt="cart" />
        <div className={s.count}>3</div>
      </div>
    );
  }
}

class CartRoot extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <h2 className={s.title}>
          My bag, <span>3 items</span>
        </h2>
      </div>
    );
  }
}

export default Cart;
