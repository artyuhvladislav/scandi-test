import React from 'react';
import { CurrencyItemT } from '../../../redux/slices/headerSlice/headerSliceTypes';
import s from './cartInfo.module.scss';
import { calcTotalPriceWithTax } from './../../../utils/index';

interface CartInfoPropsI {
  totalCount: number;
  totalPrice: number;
  currentCurrency: CurrencyItemT;
}

class CartInfo extends React.Component<CartInfoPropsI> {
  calcTax() {
    return calcTotalPriceWithTax(this.props.totalPrice);
  }
  render() {
    return (
      <div>
        <p className={s.info}>
          Tax 21%:{' '}
          <span>
            {this.props.currentCurrency.symbol} {this.calcTax()}
          </span>
        </p>
        <p className={s.info}>
          Quantity: <span>{this.props.totalCount}</span>
        </p>
        <p className={s.info}>
          Total:{' '}
          <span>
            {this.props.totalPrice} {this.props.currentCurrency.symbol}
          </span>
        </p>
        <button className={s.button}>ORDER</button>
      </div>
    );
  }
}
export default CartInfo;
