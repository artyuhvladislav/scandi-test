import React from 'react';
import { ProductItemT } from '../../redux/slices/homePageSlice/homePageSliceTypes';
import s from './product.module.scss';

class Product extends React.Component<ProductItemT> {
  render() {
    return (
      <div className={s.root}>
        <img src={this.props.gallery[0]} alt="productImg" />
        <h3 className={s.title}>{this.props.name}</h3>
        <span className={s.price}>{this.props.prices.amount}</span>
      </div>
    );
  }
}

export default Product;
