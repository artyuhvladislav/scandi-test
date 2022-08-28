import React from 'react';
import {
  ProductItemOptions,
  ProductItemGallery,
  ProductItemPrice,
  ProductItemButton,
  ProductItemDescription,
} from '../../containers';
import { ProductItemT } from '../../redux/slices/homePageSlice/homePageSliceTypes';
import s from './productPage.module.scss';

interface ProductPagePropsI {
  product: ProductItemT;
  children: string;
  currencyId: number;
}

class ProductPage extends React.Component<ProductPagePropsI> {
  render() {
    return (
      <div className={s.root}>
        <ProductItemGallery items={this.props.product.gallery} />
        <div className={s.info}>
          <ProductItemOptions {...this.props.product} />
          <ProductItemPrice currencyId={this.props.currencyId} prices={this.props.product.prices} />
          <ProductItemButton inStock={this.props.product.inStock} />
          <ProductItemDescription children={this.props.children} />
        </div>
      </div>
    );
  }
}

export default ProductPage;
