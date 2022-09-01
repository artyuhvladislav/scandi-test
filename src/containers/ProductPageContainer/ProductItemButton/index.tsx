import React from 'react';
import s from './productItemButton.module.scss';

interface ProductItemButtonPropsI {
  inStock: boolean;
  addProductToCart: () => void;
}

class ProductItemButton extends React.Component<ProductItemButtonPropsI> {
  render() {
    return (
      <button
        disabled={this.props.inStock}
        className={s.button}
        onClick={this.props.addProductToCart}>
        ADD TO CART
      </button>
    );
  }
}

export default ProductItemButton;
