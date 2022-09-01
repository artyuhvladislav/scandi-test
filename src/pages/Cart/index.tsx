import React, { ReactNode } from 'react';
import s from './cart.module.scss';

interface CartPropsI {
  children: ReactNode | ReactNode[];
}
class Cart extends React.Component<CartPropsI> {
  render() {
    return <div className={s.root}>{this.props.children}</div>;
  }
}

export default Cart;
