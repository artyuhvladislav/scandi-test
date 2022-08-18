import React from 'react';
import s from './cartItemOptions.module.scss';

class CartItemOptions extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.item}>
          <h3 className={s.itemTitle}>SIZE:</h3>
          <ul>
            <li className={s.itemOption}>
              <span>XS</span>
            </li>
            <li className={s.itemOption}>
              <span>XS</span>
            </li>
            <li className={s.itemOption}>
              <span>XS</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default CartItemOptions;
