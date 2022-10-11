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
import { addTotalCount, setItemCount, setTotalPrice } from '../../redux/slices/cartSlice/cartSlice';
import { CartStateI } from '../../redux/slices/cartSlice/cartSliceTypes';
import { HeaderStateI } from '../../redux/slices/headerSlice/headerSliceTypes';
import { ProductStateI } from '../../redux/slices/productSlice/productSliceTypes';
import { setActiveCurrency } from '../../utils';
import { CartItemI } from './../../redux/slices/cartSlice/cartSliceTypes';
import s from './cartContainer.module.scss';

type CartContainerStateT = {
  cart: CartStateI;
  header: HeaderStateI;
  product: ProductStateI;
};

interface CartContainerPropsI extends PropsFromRedux {
  isSmallCart?: boolean;
  toggleCartVisibility?: () => void;
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

  setTotalPrice = () => {
    this.props.setTotalPrice(this.props.currentCurrency);
  };

  createCartItems() {
    return this.props.items.map((item, idx) => {
      return (
        <li className={this.props.isSmallCart ? s.smallItem : s.item} key={idx}>
          <div>
            <h2 className={this.props.isSmallCart ? s.smallBrand : s.brand}>
              {item.product.brand}
            </h2>
            <p className={this.props.isSmallCart ? s.smallName : s.name}>{item.product.name}</p>
            {this.props.isSmallCart ? (
              <ProductItemPrice
                currencyId={this.setActiveCurrency(item)}
                prices={item.product.prices}
                count={item.count}
                isSmallCart={this.props.isSmallCart}
              />
            ) : (
              ''
            )}
            <ProductItemOptions
              {...item.product}
              itemId={idx}
              selectable={false}
              isSmallCart={this.props.isSmallCart}
            />
            {this.props.isSmallCart ? (
              ''
            ) : (
              <ProductItemPrice
                currencyId={this.setActiveCurrency(item)}
                prices={item.product.prices}
                count={item.count}
              />
            )}
          </div>
          <CartItemCount
            count={item.count}
            addTotalCount={this.addTotalCount}
            setItemCount={this.setItemCount}
            setTotalPrice={this.setTotalPrice}
            id={idx}
            isSmallCart={this.props.isSmallCart}
          />
          <CartItemGallery gallery={item.product.gallery} isSmallCart={this.props.isSmallCart} />
        </li>
      );
    });
  }
  render() {
    return this.props.isSmallCart ? (
      <OpenedCart
        count={this.props.totalCount}
        price={this.props.totalPrice}
        currency={this.props.currentCurrency.symbol}
        toggleCartVisibility={this.props.toggleCartVisibility}>
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
  setTotalPrice,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CartContainer);
