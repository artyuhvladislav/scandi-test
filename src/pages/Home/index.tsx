import React from 'react';
import { Product } from '../../components';
import { CategoryItemT } from '../../redux/slices/headerSlice/headerSliceTypes';
import { ProductItemT } from '../../redux/slices/homePageSlice/homePageSliceTypes';
import s from './homePage.module.scss';

interface HomePagePropsI {
  activeProducts: ProductItemT[];
  currentCategory: CategoryItemT;
  id: number;
}

class HomePage extends React.Component<HomePagePropsI> {
  render() {
    console.log(1111);
    return (
      <div className={s.root}>
        <h1 className={s.title}>{this.props.currentCategory.name}</h1>
        <div className={s.grid}>
          {this.props.activeProducts.map((item) => (
            <Product key={item.id} {...item} currencyId={this.props.id} />
          ))}
        </div>
      </div>
    );
  }
}

export default HomePage;
