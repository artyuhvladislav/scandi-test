import React from 'react';
import {
  ProductAttributeT,
  ProductItemT,
} from '../../../redux/slices/homePageSlice/homePageSliceTypes';
import { ProductItemOption } from '../../../containers';
import s from './productItemOptions.module.scss';

interface ProductItemOptionsPropsI extends ProductItemT {
  itemId?: number;
  selectable?: boolean;
}
class ProductItemOptions extends React.Component<ProductItemOptionsPropsI> {
  createProductItemOptions() {
    return this.props.attributes?.map((atr: ProductAttributeT, idx) => {
      return (
        <ProductItemOption
          key={idx}
          itemId={this.props.itemId}
          options={atr.items}
          name={atr.name}
          selectedItem={atr.selectedItem}
          selectable={this.props.selectable}
        />
      );
    });
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
