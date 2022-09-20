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
    modalMounted: false,
  };

  modalRef = React.createRef<HTMLDivElement>();
  cartRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    document.addEventListener('click', this.checkIfClickedOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.checkIfClickedOutside);
  }

  checkIfClickedOutside = (e: Event) => {
    if (
      this.state.isOpen &&
      this.modalRef.current &&
      !this.modalRef.current.contains(e.target as HTMLElement) &&
      !this.cartRef.current?.contains(e.target as HTMLElement)
    ) {
      this.toggleCartVisibility();
    }
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
        <div className={s.root} onClick={this.toggleCartVisibility} ref={this.modalRef}>
          <img src={cart} alt="cart" />

          {this.props.totalCount === 0 ? (
            ''
          ) : (
            <div className={s.count}>{this.props.totalCount}</div>
          )}
        </div>
        <Modal isOpen={this.state.isOpen} cartRef={this.cartRef} />
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
