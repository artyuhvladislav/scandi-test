import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Home } from '../../pages';
import { CategoryItemT, HeaderStateI } from '../../redux/slices/headerSlice/headerSliceTypes';
import {
  getProduct,
  setCurrentPage,
  setProducts,
} from '../../redux/slices/homePageSlice/homePageSlice';
import { HomePageStateI, ProductItemT } from '../../redux/slices/homePageSlice/homePageSliceTypes';
import { setActiveCurrency } from '../../utils';
import { PaginationContainer } from '../index';

interface HomePageContainerPropsI extends PropsFromRedux {
  currentCategory: CategoryItemT;
  products: ProductItemT[];
  activeProducts: ProductItemT[];
}

export type HomePageContainerStateT = {
  header: HeaderStateI;
  home: HomePageStateI;
};

class HomePageContainer extends React.Component<HomePageContainerPropsI> {
  componentDidMount() {
    this.props.getProduct(this.props.currentCategory.name).then(({ payload }) => {
      this.props.setProducts(payload as ProductItemT[]);
    });
  }
  componentDidUpdate(prevProps: HomePageContainerPropsI) {
    if (this.props.currentCategory !== prevProps.currentCategory) {
      this.props.getProduct(this.props.currentCategory.name).then(({ payload }) => {
        const currentPage = 1;
        this.props.setCurrentPage(currentPage);
        this.props.setProducts(payload as ProductItemT[]);
      });
    }
  }

  setActiveCurrency() {
    return setActiveCurrency(this.props.activeProducts, this.props.currentCurrency.symbol);
  }

  render() {
    return (
      <div>
        <Home
          activeProducts={this.props.activeProducts}
          currentCategory={this.props.currentCategory}
          id={this.setActiveCurrency()}
        />
        <PaginationContainer />
      </div>
    );
  }
}

const mapState = (state: HomePageContainerStateT) => ({
  currentCategory: state.header.currentCategory,
  products: state.home.products,
  activeProducts: state.home.activeProducts,
  currentCurrency: state.header.currentCurrency,
});

const mapDispatch = {
  setProducts,
  getProduct,
  setCurrentPage,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(HomePageContainer);
