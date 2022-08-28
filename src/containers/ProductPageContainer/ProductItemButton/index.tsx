import React from 'react';
import s from './productItemButton.module.scss';

interface ProductItemButtonPropsI {
  inStock: boolean;
}

class ProductItemButton extends React.Component<ProductItemButtonPropsI> {
  render() {
    return (
      <button disabled={this.props.inStock} className={s.button}>
        ADD TO CART
      </button>
    );
  }
}

export default ProductItemButton;
