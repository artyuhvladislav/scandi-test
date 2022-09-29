import React, { ReactNode } from 'react';
import s from './openedCart.module.scss';
import { Link } from 'react-router-dom';

interface OpenedCartPropsI {
  count: number;
  price: number;
  currency: string;
  children: ReactNode | ReactNode[];
  toggleCartVisibility?: () => void | undefined;
}

class OpenedCart extends React.Component<OpenedCartPropsI> {
  render() {
    return (
      <div>
        <h2 className={s.title}>
          My Bag,{' '}
          <span>
            {this.props.count === 1 ? this.props.count + ' item' : this.props.count + ' items'}
          </span>
        </h2>
        {this.props.children}
        <div className={s.price}>
          <span>Total</span>
          <span>
            {this.props.currency}
            {this.props.price}
          </span>
        </div>
        <div className={s.buttons}>
          <Link to="/cart" onClick={this.props.toggleCartVisibility}>
            <button className={s.button}>View bag</button>
          </Link>
          <button className={`${s.button} ${s.buttonGreen}`}>CHECK OUT</button>
        </div>
      </div>
    );
  }
}

export default OpenedCart;
