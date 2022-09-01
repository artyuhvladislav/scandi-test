import React from 'react';
import s from './modal.module.scss';
import { Link } from 'react-router-dom';
import { plus } from '../../assets/icons';
import CartContainer from '../CartContainer';

interface ModalPropsI {
  toggleCartVisibility: () => void;
}

class Modal extends React.Component<ModalPropsI> {
  render() {
    return (
      <div className={s.modal}>
        <div className={s.modalContainer}>
          <button className={s.close} onClick={this.props.toggleCartVisibility}>
            <img src={plus} alt="close popup" />
          </button>
          <CartContainer isSmallCart={true} />
        </div>
      </div>
    );
  }
}
export default Modal;
