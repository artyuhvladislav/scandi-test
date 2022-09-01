import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import React from 'react';
import { plus, minus } from '../../../assets/icons';
import s from './cartItemCount.module.scss';

interface CartItemCountPropsI {
  count: number;
  addTotalCount: (val: number) => void;
  setItemCount: ({ id, val }: { id: number; val: number }) => void;
  setTotalPrice: () => void;
  id: number;
}

interface CartItemCountStateI {
  count: number;
  disabled: boolean;
}

class CartItemCount extends React.Component<CartItemCountPropsI, CartItemCountStateI> {
  state = {
    count: this.props.count,
    disabled: false,
  };

  disabled() {
    return this.state.count === 1 || this.state.disabled;
  }

  plusCount = () => {
    this.setState({ count: this.state.count + 1 });
    this.props.addTotalCount(1);
    this.props.setItemCount({ id: this.props.id, val: 1 });
    this.props.setTotalPrice();
  };

  minusCount = () => {
    if (this.state.count === 1) {
      this.setState({ disabled: true });
      return;
    }
    this.setState({ count: this.state.count - 1 });
    this.props.addTotalCount(0);
    this.props.setItemCount({ id: this.props.id, val: 0 });
    this.props.setTotalPrice();
  };

  render() {
    return (
      <div className={s.root}>
        <button className={s.button} onClick={this.minusCount} disabled={this.disabled()}>
          <img src={minus} alt="-" />
        </button>
        <span>{this.state.count}</span>
        <button className={s.button} onClick={this.plusCount}>
          <img src={plus} alt="+" />
        </button>
      </div>
    );
  }
}
export default CartItemCount;
