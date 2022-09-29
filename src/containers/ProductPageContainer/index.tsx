import React from 'react';
import ReactHtmlParser, { convertNodeToElement, Transform } from 'react-html-parser';
import { connect, ConnectedProps } from 'react-redux';
import { fetchProduct, setProduct } from '../../redux/slices/productSlice/productSlice';
import { getProductIdFromUrl, setActiveCurrency } from '../../utils';
import { ProductPage } from '../../components';
import { ProductItemT } from '../../redux/slices/homePageSlice/homePageSliceTypes';
import { ProductStateI } from '../../redux/slices/productSlice/productSliceTypes';
import { HeaderStateI } from '../../redux/slices/headerSlice/headerSliceTypes';
import { addProduct, setTotalPrice } from '../../redux/slices/cartSlice/cartSlice';

type ProductItemContainerStateT = {
  product: ProductStateI;
  header: HeaderStateI;
};

class ProductPageContainer extends React.Component<PropsFromRedux> {
  componentDidMount() {
    const id = getProductIdFromUrl();
    this.props.fetchProduct(id).then(({ payload }) => {
      this.props.setProduct(payload as ProductItemT);
    });
  }
  setActiveCurrency() {
    return setActiveCurrency(this.props.product, this.props.currentCurrency.symbol);
  }
  parserToHTML = (input: string) => {
    const transform: Transform = (node, index) => {
      if (node.type === 'tag' && node.name === 'h1') {
        node.name = 'h3';
        return convertNodeToElement(node, index, transform);
      }
    };
    return ReactHtmlParser(input, { transform });
  };
  addProductToCart = () => {
    if (this.props.product.inStock) {
      this.props.addProduct({
        product: this.props.product,
        count: 1,
      });
      this.props.setTotalPrice(this.props.currentCurrency);
    }
  };

  render() {
    return (
      <ProductPage
        product={this.props.product}
        currencyId={this.setActiveCurrency()}
        addProductToCart={this.addProductToCart}>
        {this.parserToHTML(this.props.product.description || '') as unknown as string}
      </ProductPage>
    );
  }
}

const mapState = (state: ProductItemContainerStateT) => ({
  product: state.product.product,
  currentCurrency: state.header.currentCurrency,
});

const mapDispatch = {
  setProduct,
  fetchProduct,
  addProduct,
  setTotalPrice,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ProductPageContainer);
