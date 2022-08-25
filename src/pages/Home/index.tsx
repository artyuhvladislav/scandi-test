import React from 'react';
import { Product } from '../../components';
import { CategoryItemT } from '../../redux/slices/headerSlice/headerSliceTypes';
import { ProductItemT } from '../../redux/slices/homePageSlice/homePageSliceTypes';
import s from './homePage.module.scss';

interface HomePagePropsI {
  activeProducts: ProductItemT[];
  currentCategory: CategoryItemT;
}

class HomePage extends React.Component<HomePagePropsI> {
  render() {
    return (
      <div className={s.root}>
        <h1 className={s.title}>{this.props.currentCategory.name}</h1>
        <div className={s.grid}>
          {this.props.activeProducts.map((item) => (
            <Product {...item} />
          ))}
        </div>
      </div>
    );
  }
}

export default HomePage;
