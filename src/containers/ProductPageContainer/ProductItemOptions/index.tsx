import React from 'react';
import {
  ProductAttributeT,
  ProductItemT,
} from '../../../redux/slices/homePageSlice/homePageSliceTypes';
import { ProductItemOption } from '../../../containers';
import s from './productItemOptions.module.scss';
import { OptionItemT } from '../ProductItemOption';

class ProductItemOptions extends React.Component<ProductItemT> {
  createProductItemOptions() {
    return this.props.attributes?.map((atr: ProductAttributeT, idx) => (
      <ProductItemOption
        key={idx}
        options={atr.items as unknown as OptionItemT[]}
        name={atr.name}
      />
    ));
  }
  render() {
    return (
      <div>
        <h2 className={s.brand}>{this.props.brand}</h2>
        <p className={s.name}>{this.props.name}</p>
        {this.createProductItemOptions()}
      </div>
    );
  }
}

export default ProductItemOptions;
