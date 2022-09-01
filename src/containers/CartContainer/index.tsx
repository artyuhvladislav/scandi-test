import React from 'react';

import { connect, ConnectedProps } from 'react-redux';
import {
  CartInfo,
  CartItemCount,
  CartItemGallery,
  OpenedCart,
  ProductItemOptions,
  ProductItemPrice,
} from '..';
import { Cart } from '../../pages';
import {
  addTotalCount,
  removeItem,
  setItemCount,
  setTotalPrice,
} from '../../redux/slices/cartSlice/cartSlice';
import { CartStateI } from '../../redux/slices/cartSlice/cartSliceTypes';
import { HeaderStateI } from '../../redux/slices/headerSlice/headerSliceTypes';
import { ProductStateI } from '../../redux/slices/productSlice/productSliceTypes';
import { setActiveCurrency } from '../../utils';
import { CartItemI } from './../../redux/slices/cartSlice/cartSliceTypes';
import { plus } from '../../assets/icons';
import s from './cartContainer.module.scss';

type CartContainerStateT = {
  cart: CartStateI;
  header: HeaderStateI;
  product: ProductStateI;
};

interface CartContainerPropsI extends PropsFromRedux {
  isSmallCart?: boolean;
}

class CartContainer extends React.Component<CartContainerPropsI> {
  setActiveCurrency(item: CartItemI) {
    return setActiveCurrency(item.product || item, this.props.currentCurrency.symbol);
  }

  addTotalCount = (val: number) => {
    this.props.addTotalCount(val);
  };

  setItemCount = ({ id, val }: { id: number; val: number }) => {
    this.props.setItemCount({ id, val });
  };

  removeItem = (idx: number) => {
    this.props.removeItem(idx);
    this.setTotalPrice();
  };

  setTotalPrice = () => {
    this.props.setTotalPrice(this.props.currentCurrency);
  };

  createCartItems() {
    return this.props.items.map((item, idx) => {
      return (
        <li className={s.item} key={idx}>
          <div>
            <ProductItemOptions {...item.product} itemId={idx} />
            <ProductItemPrice
              currencyId={this.setActiveCurrency(item)}
              prices={item.product.prices}
              count={item.count}
            />
          </div>
          <CartItemCount
            count={item.count}
            addTotalCount={this.addTotalCount}
            setItemCount={this.setItemCount}
            setTotalPrice={this.setTotalPrice}
            id={idx}
          />
          <CartItemGallery gallery={item.product.gallery} />
          <button className={s.button} onClick={() => this.removeItem(idx)}>
            <img src={plus} alt="remove" />
          </button>
        </li>
      );
    });
  }
  render() {
    return this.props.isSmallCart ? (
      <OpenedCart
        count={this.props.totalCount}
        price={this.props.totalPrice}
        currency={this.props.currentCurrency.symbol}>
        <ul className={s.list}>{this.createCartItems()}</ul>
      </OpenedCart>
    ) : (
      <Cart>
        <h1 className={s.title}>Cart</h1>
        <ul className={s.list}>{this.createCartItems()}</ul>
        <CartInfo
          totalCount={this.props.totalCount}
          totalPrice={this.props.totalPrice}
          currentCurrency={this.props.currentCurrency}
        />
      </Cart>
    );
  }
}

const mapState = (state: CartContainerStateT) => ({
  items: state.cart.items,
  currentCurrency: state.header.currentCurrency,
  totalCount: state.cart.totalCount,
  totalPrice: state.cart.totalPrice,
});

const mapDispatch = {
  addTotalCount,
  setItemCount,
  removeItem,
  setTotalPrice,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CartContainer);