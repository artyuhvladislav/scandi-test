import React from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, Transform } from 'react-html-parser';
import { connect, ConnectedProps } from 'react-redux';
import { fetchProduct, setProduct } from '../../redux/slices/productSlice/productSlice';
import { getProductIdFromUrl, setActiveCurrency } from '../../utils';
import { ProductPage } from '../../components';
import { ProductItemT } from '../../redux/slices/homePageSlice/homePageSliceTypes';
import { ProductStateI } from '../../redux/slices/productSlice/productSliceTypes';
import { HeaderStateI } from '../../redux/slices/headerSlice/headerSliceTypes';

interface ProductPageContainerPropsI extends PropsFromRedux {}
type ProductItemContainerStateT = {
  product: ProductStateI;
  header: HeaderStateI;
};

class ProductPageContainer extends React.Component<ProductPageContainerPropsI> {
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
      // convert <ul> to <ol>
      if (node.type === 'tag' && node.name === 'h1') {
        node.name = 'h3';
        return convertNodeToElement(node, index, transform);
      }
    };
    return ReactHtmlParser(input, { transform });
  };

  render() {
    return (
      <ProductPage product={this.props.product} currencyId={this.setActiveCurrency()}>
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
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ProductPageContainer);
