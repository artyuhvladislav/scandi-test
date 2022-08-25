import React from 'react';
import { Product } from '../../components';
import { ProductItemT } from '../../redux/slices/homePageSlice/homePageSliceTypes';
import s from './homePage.module.scss';

interface HomePagePropsI {
  activeProducts: ProductItemT[];
}

class HomePage extends React.Component<HomePagePropsI> {
  render() {
    return (
      <div className={s.root}>
        <h1 className={s.title}>Category Name</h1>
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
