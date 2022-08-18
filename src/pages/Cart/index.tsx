import React from 'react';
import CartItem from '../../components/Cart/CartItem';
import s from './cart.module.scss';

class Cart extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <h1 className={s.title}>Cart</h1>
        <CartItem />
        <CartItem />
      </div>
    );
  }
}

export default Cart;
