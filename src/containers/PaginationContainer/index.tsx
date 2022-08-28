import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/homePageSlice/homePageSlice';
import { Pagination } from '../../components';
import { HomePageStateI } from './../../redux/slices/homePageSlice/homePageSliceTypes';

interface PaginationContainerPropsI extends PropsFromRedux {
  currentPage: number;
  maxProductsCount: number;
  totalCount: number;
}

interface PaginationContainerStateI {
  home: HomePageStateI;
}

class PaginationContainer extends React.Component<PaginationContainerPropsI> {
  paginate = (pageNumber: number) => {
    this.props.setCurrentPage(pageNumber);
  };

  render() {
    const pageNumbers = [];
    const showPagination = this.props.totalCount > this.props.maxProductsCount;

    for (let i = 1; i <= Math.ceil(this.props.totalCount / this.props.maxProductsCount); i++) {
      pageNumbers.push(i);
    }
    return (
      showPagination && (
        <Pagination
          paginate={this.paginate}
          pageNumbers={pageNumbers}
          currentPage={this.props.currentPage}
        />
      )
    );
  }
}

const mapState = (state: PaginationContainerStateI) => ({
  currentPage: state.home.currentPage,
  maxProductsCount: state.home.maxProductsCount,
  totalCount: state.home.products.length,
});

const mapDispatch = {
  setCurrentPage,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PaginationContainer);
