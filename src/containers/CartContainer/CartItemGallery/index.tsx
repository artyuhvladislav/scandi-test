import React from 'react';
import { arrow } from '../../../assets/icons';
import s from './cartItemGallery.module.scss';

interface CartItemGalleryPropsI {
  gallery: string[];
}

interface CartItemGalleryStateI {
  currentImgId: number;
}

class CartItemGallery extends React.Component<CartItemGalleryPropsI, CartItemGalleryStateI> {
  state = {
    currentImgId: 0,
  };

  setNextImgId = () => {
    if (this.state.currentImgId === this.props.gallery.length - 1) {
      this.setState({ currentImgId: 0 });
      return;
    }
    this.setState({ currentImgId: this.state.currentImgId + 1 });
  };

  setPrevImgId = () => {
    if (this.state.currentImgId === 0) {
      this.setState({ currentImgId: this.props.gallery.length - 1 });
      return;
    }
    this.setState({ currentImgId: this.state.currentImgId - 1 });
  };
  render() {
    return (
      <div className={s.root}>
        <img src={this.props.gallery[this.state.currentImgId]} alt="img gallery" />
        {this.props.gallery.length > 1 ? (
          <div className={s.buttons}>
            <button className={s.button} onClick={this.setPrevImgId}>
              <img src={arrow} alt="-" />
            </button>
            <button className={s.button} onClick={this.setNextImgId}>
              <img src={arrow} alt="+" />
            </button>
          </div>
        ) : (
          ''
        )}
        <div className={s.buttons}></div>
      </div>
    );
  }
}
export default CartItemGallery;
