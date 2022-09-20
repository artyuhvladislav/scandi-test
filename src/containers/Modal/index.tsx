import React from 'react';
import s from './modal.module.scss';
import CartContainer from '../CartContainer';

interface ModalPropsI {
  isOpen: boolean;
  cartRef: React.RefObject<HTMLDivElement>;
}

class Modal extends React.Component<ModalPropsI> {
  render() {
    return (
      this.props.isOpen && (
        <div className={s.modal}>
          <div className={s.modalContainer} ref={this.props.cartRef}>
            <CartContainer isSmallCart={true} />
          </div>
        </div>
      )
    );
  }
}
export default Modal;
