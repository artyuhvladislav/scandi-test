import React from 'react';
import { ProductPriceT } from '../../../redux/slices/homePageSlice/homePageSliceTypes';
import s from './productPrice.module.scss';

interface ProductItemPricePropsI {
  currencyId: number;
  prices: ProductPriceT[];
  count?: number;
}
class ProductItemPrice extends React.Component<ProductItemPricePropsI> {
  setPrice() {
    if (this.props.prices) {
      const symbol = this.props?.prices[this.props.currencyId].currency.symbol;
      const price = this.props?.prices[this.props.currencyId].amount * (this.props.count || 1);
      return `${symbol} ${price.toFixed(2)}`;
    }
  }
  render() {
    return (
      <div className={s.root}>
        <h3 className={s.title}>Price: </h3>
        <p className={s.item}>{this.setPrice()}</p>
      </div>
    );
  }
}

export default ProductItemPrice;
