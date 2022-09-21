import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Home } from '../../pages';
import { CategoryItemT, HeaderStateI } from '../../redux/slices/headerSlice/headerSliceTypes';
import { getProduct, setProducts } from '../../redux/slices/homePageSlice/homePageSlice';
import { HomePageStateI, ProductItemT } from '../../redux/slices/homePageSlice/homePageSliceTypes';
import { setActiveCurrency } from '../../utils';

interface HomePageContainerPropsI extends PropsFromRedux {
  currentCategory: CategoryItemT;
  products: ProductItemT[];
}

export type HomePageContainerStateT = {
  header: HeaderStateI;
  home: HomePageStateI;
};

class HomePageContainer extends React.Component<HomePageContainerPropsI> {
  mounted = false;

  componentDidMount() {
    if (!this.mounted) {
      this.props.getProduct(this.props.currentCategory.name).then(({ payload }) => {
        this.props.setProducts(payload as ProductItemT[]);
      });
      this.mounted = true;
    }
  }
  componentDidUpdate(prevProps: HomePageContainerPropsI) {
    if (this.props.currentCategory !== prevProps.currentCategory) {
      this.props.getProduct(this.props.currentCategory.name).then(({ payload }) => {
        this.props.setProducts(payload as ProductItemT[]);
      });
    }
  }

  setActiveCurrency() {
    return setActiveCurrency(this.props.products, this.props.currentCurrency.symbol);
  }

  render() {
    return (
      <div>
        <Home
          activeProducts={this.props.products}
          currentCategory={this.props.currentCategory}
          id={this.setActiveCurrency()}
        />
      </div>
    );
  }
}

const mapState = (state: HomePageContainerStateT) => ({
  currentCategory: state.header.currentCategory,
  products: state.home.products,
  currentCurrency: state.header.currentCurrency,
});

const mapDispatch = {
  setProducts,
  getProduct,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(HomePageContainer);
