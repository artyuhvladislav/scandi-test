import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { cart } from '../../assets/icons';
import { Modal } from '../../containers';
import { CartStateI } from '../../redux/slices/cartSlice/cartSliceTypes';
import s from './cart.module.scss';
import { SmallCartStateI } from './Cart.type';

interface SmallCartMapStateI {
  cart: CartStateI;
}
class SmallCart extends React.Component<PropsFromRedux, SmallCartStateI> {
  state = {
    isOpen: false,
  };

  toggleCartVisibility = () => {
    this.setState({ isOpen: !this.state.isOpen });
    if (this.state.isOpen) {
      document.body.style.overflowY = 'scroll';
    } else {
      document.body.style.overflowY = 'hidden';
    }
  };

  render() {
    return (
      <div>
        <div className={s.root} onClick={this.toggleCartVisibility}>
          <img src={cart} alt="cart" />
          <div className={s.count}>{this.props.totalCount}</div>
        </div>
        {this.state.isOpen && <Modal toggleCartVisibility={this.toggleCartVisibility} />}
      </div>
    );
  }
}

const mapState = (state: SmallCartMapStateI) => ({
  totalCount: state.cart.totalCount,
});

const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SmallCart);
