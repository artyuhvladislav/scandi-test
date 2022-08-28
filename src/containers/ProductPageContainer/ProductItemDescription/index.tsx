import React from 'react';
import s from './productItemDescription.module.scss';

interface ProductItemDescriptionPropsI {
  children: string;
}

class ProductItemDescription extends React.Component<ProductItemDescriptionPropsI> {
  render() {
    return <div className={s.root}>{this.props.children}</div>;
  }
}

export default ProductItemDescription;
