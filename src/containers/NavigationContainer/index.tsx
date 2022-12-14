import React from 'react';
import {
  getCategory,
  setCategories,
  setCurrentCategory,
} from '../../redux/slices/headerSlice/headerSlice';
import { connect, ConnectedProps } from 'react-redux';
import { Navigation } from '../../components';
import { CategoryItemT, HeaderStateI } from '../../redux/slices/headerSlice/headerSliceTypes';

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
    this.props
      .getCategory()
      .then(({ payload }) => {
        if (!payload) {
          throw new Error();
        }
        this.props.setCategories(payload as CategoryItemT[]);
      })
      .catch(() => {
        this.props.setCategories([{ name: 'all' }, { name: 'clothes' }, { name: 'tech' }]);
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
