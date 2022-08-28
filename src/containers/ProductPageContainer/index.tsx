import React from 'react';
import parse from 'html-react-parser';
import { connect, ConnectedProps } from 'react-redux';
import { fetchProduct, setProduct } from '../../redux/slices/productSlice/productSlice';
import { getProductIdFromUrl } from '../../utils';
import { ProductPage } from '../../components';
import { ProductItemT } from '../../redux/slices/homePageSlice/homePageSliceTypes';
import { ProductStateI } from '../../redux/slices/productSlice/productSliceTypes';

interface ProductPageContainerPropsI extends PropsFromRedux {}
type ProductItemContainerStateT = {
  product: ProductStateI;
};

class ProductPageContainer extends React.Component<ProductPageContainerPropsI> {
  componentDidMount() {
    const id = getProductIdFromUrl();
    this.props.fetchProduct(id).then(({ payload }) => {
      this.props.setProduct(payload as ProductItemT);
    });
  }

  parserToHTML = (input: string) =>
    parse(input, {
      replace: (domNode) => {
        // @ts-ignore
        if (domNode.attribs?.name?.includes('h')) {
          console.log(domNode);
          // @ts-ignore
          return <h3>{domNode.data}</h3>;
        }
      },
    });

  render() {
    return (
      <ProductPage product={this.props.product}>
        {this.parserToHTML(this.props.product.description || '') as string}
      </ProductPage>
    );
  }
}

const mapState = (state: ProductItemContainerStateT) => ({
  product: state.product.product,
});

const mapDispatch = {
  setProduct,
  fetchProduct,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ProductPageContainer);
