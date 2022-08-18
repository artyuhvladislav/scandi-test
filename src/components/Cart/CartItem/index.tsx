import React from 'react';
import CartItemOptions from '../CartItemOptions';
import s from './cartItem.module.scss';

class CartItem extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.item}>
          <div className={s.itemSettings}>
            <h2 className={s.itemProducer}>Apollo</h2>
            <h2 className={s.itemName}>Running Short</h2>
            <p className={s.itemPrice}>$50.00</p>
            <CartItemOptions />
            <CartItemOptions />
          </div>
          <div className={s.itemCount}>
            <button>+</button>
            <span>3</span>
            <button>-</button>
          </div>
          <img src="" alt="" />
        </div>
      </div>
    );
  }
}
export default CartItem;
