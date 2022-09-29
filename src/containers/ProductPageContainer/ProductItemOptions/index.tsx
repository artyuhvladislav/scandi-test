import React from 'react';
import {
  ProductAttributeT,
  ProductItemT,
} from '../../../redux/slices/homePageSlice/homePageSliceTypes';
import { ProductItemOption } from '../../../containers';

interface ProductItemOptionsPropsI extends ProductItemT {
  itemId?: number;
  selectable?: boolean;
  isSmallCart?: boolean;
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
          isSmallCart={this.props.isSmallCart}
        />
      );
    });
  }
  render() {
    return <div>{this.createProductItemOptions()}</div>;
  }
}

export default ProductItemOptions;
