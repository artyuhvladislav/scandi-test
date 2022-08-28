import React from 'react';
import { Link } from 'react-router-dom';
import { ProductItemT } from '../../redux/slices/homePageSlice/homePageSliceTypes';
import s from './product.module.scss';

interface ProductPropsI extends ProductItemT {
  currencyId: number;
}
class Product extends React.Component<ProductPropsI> {
  render() {
    return (
      <div className={this.props.inStock === true ? s.opacity : s.root}>
        <Link to={`id/${this.props.id}`}>
          {this.props.inStock && <p className={s.opacityText}>OUT OF STOCK</p>}
          <img src={this.props.gallery[0]} alt="productImg" />
          <div className={s.text}>
            <h3 className={s.title}>{this.props.name}</h3>
            <span className={s.price}>
              {this.props.prices[this.props.currencyId]?.currency.symbol}
              {this.props.prices[this.props.currencyId].amount}
            </span>
          </div>
        </Link>
      </div>
    );
  }
}

export default Product;
