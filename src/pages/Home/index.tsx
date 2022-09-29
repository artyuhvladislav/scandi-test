import React from 'react';
import { Product } from '../../components';
import { CategoryItemT } from '../../redux/slices/headerSlice/headerSliceTypes';
import { ProductItemT } from '../../redux/slices/homePageSlice/homePageSliceTypes';
import s from './homePage.module.scss';

interface HomePagePropsI {
  activeProducts: ProductItemT[];
  currentCategory: CategoryItemT;
  id: number;
  addProductToCart: (inStock: boolean, product: ProductItemT) => void;
}

class HomePage extends React.Component<HomePagePropsI> {
  render() {
    return (
      <div className={s.root}>
        <h1 className={s.title}>{this.props.currentCategory.name}</h1>
        <div className={s.grid}>
          {this.props.activeProducts.map((item) => (
            <Product
              key={item.id}
              product={item}
              {...item}
              currencyId={this.props.id}
              addProductToCart={this.props.addProductToCart}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default HomePage;
