import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ProductPriceT } from '../../../redux/slices/homePageSlice/homePageSliceTypes';
import { ProductStateI } from '../../../redux/slices/productSlice/productSliceTypes';
import s from './productPrice.module.scss';

interface ProductItemPricePropsI {
  currencyId: number;
  prices: ProductPriceT[];
}

interface ProductItemPriceStateI {
  product: ProductStateI;
}

class ProductItemPrice extends React.Component<ProductItemPricePropsI> {
  render() {
    console.log(this.props.currencyId);
    return (
      <div className={s.root}>
        <h3 className={s.title}>Price: </h3>
        <p className={s.item}>
          {this.props.prices && this.props?.prices[this.props.currencyId].currency.symbol}{' '}
          {this.props.prices && this.props?.prices[this.props.currencyId].amount}
        </p>
      </div>
    );
  }
}

// const mapState = (state: ProductItemPriceStateI) => ({
//   price: state.product.price,
// });

// const mapDispatch = {
//   // setPrice,
// };

// const connector = connect(mapState, mapDispatch);
// type PropsFromRedux = ConnectedProps<typeof connector>;

// export default connector(ProductItemPrice);
export default ProductItemPrice;
