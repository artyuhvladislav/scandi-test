import React from 'react';
import { Link } from 'react-router-dom';
import { ProductItemT } from '../../redux/slices/homePageSlice/homePageSliceTypes';
import { cartWhite } from '../../assets/icons';
import s from './product.module.scss';

interface ProductPropsI extends ProductItemT {
  currencyId: number;
  product: ProductItemT;
  addProductToCart: (inStock: boolean, product: ProductItemT) => void;
}
class Product extends React.Component<ProductPropsI> {
  render() {
    return (
      <div className={this.props.inStock === true ? s.root : s.opacity}>
        <Link to={`id/${this.props.id}`}>
          {!this.props.inStock && <p className={s.opacityText}>OUT OF STOCK</p>}
          <img className={s.productImg} src={this.props.gallery[0]} alt="productImg" />
          <div className={s.text}>
            <h3 className={s.title}>{this.props.name}</h3>
            <span className={s.price}>
              {this.props.prices[this.props.currencyId]?.currency.symbol}
              {this.props.prices[this.props.currencyId].amount}
            </span>
          </div>
        </Link>
        {this.props.inStock && (
          <div
            className={s.add}
            onClick={() => {
              this.props.addProductToCart(this.props.inStock, this.props.product);
            }}>
            <img src={cartWhite} alt="cart" />
          </div>
        )}
      </div>
    );
  }
}

export default Product;
