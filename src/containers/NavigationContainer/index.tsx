import React from 'react';
import {
  CategoryItemT,
  getCategory,
  HeaderStateI,
  setCategories,
  setCurrentCategory,
} from '../../redux/slices/headerSlice';
import { connect, ConnectedProps } from 'react-redux';
import { Navigation } from '../../components';

interface CategoriesContainerPropsI extends PropsFromRedux {
  categories: CategoryItemT[];
  currentCategory: CategoryItemT;
}

type CategoriesContainerStateT = {
  header: HeaderStateI;
};

class NavigationContainer extends React.Component<CategoriesContainerPropsI> {
  setActiveLink = (value: HTMLElement) => {
    if (value.textContent) {
      this.props.setCurrentCategory({ name: value.textContent });
    }
  };
  componentDidMount() {
    this.props.getCategory().then(({ payload }: any) => {
      this.props.setCategories(payload);
    });
  }
  render() {
    return (
      <Navigation
        setActiveLink={this.setActiveLink}
        categories={this.props.categories}
        activeCategory={this.props.currentCategory}
      />
    );
  }
}

const mapState = (state: CategoriesContainerStateT) => ({
  categories: state.header.categories,
  currentCategory: state.header.currentCategory,
});

const mapDispatch = {
  setCategories,
  setCurrentCategory,
  getCategory,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(NavigationContainer);
