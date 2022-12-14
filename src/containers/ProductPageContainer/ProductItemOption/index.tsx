import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { CartStateI } from '../../../redux/slices/cartSlice/cartSliceTypes';
import { setSelectedAttribute } from '../../../redux/slices/productSlice/productSlice';
import { getSelectedOption, setBorderStyle } from '../../../utils';
import s from './productItemOption.module.scss';

export type OptionItemT = {
  value: string;
};

interface ProductItemOptionPropsI extends PropsFromRedux {
  name: string;
  options: OptionItemT[];
  selectedItem: OptionItemT;
  itemId: number | undefined;
  selectable?: boolean;
  isSmallCart?: boolean;
}

interface ProductItemOptionStateI {
  optionName: string;
  selectedOption: OptionItemT;
}

interface ProductItemOptionStateFromStoreI {
  cart: CartStateI;
}

class ProductItemOption extends React.Component<ProductItemOptionPropsI, ProductItemOptionStateI> {
  ulRef = React.createRef<HTMLUListElement>();
  state = {
    optionName: 'Color',
    selectedOption: {
      value: '',
    },
  };

  setInitialValue() {
    let value: string;
    if (this.props.selectedItem) {
      value = this.props.selectedItem.value;
    } else {
      value = this.state.selectedOption.value;
    }
    return value;
  }

  setClassName() {
    if (this.props.selectable === false) {
      return `${s.itemNotSelectable}`;
    }
  }

  createOptionList() {
    return this.props.options.map((item, idx) => {
      const value = this.setInitialValue();

      if (this.props.name === this.state.optionName) {
        return (
          <li
            key={idx}
            className={value === item.value ? `${s.itemColor} ${s.activeColor}` : s.itemColor}
            style={{
              background: item.value,
              border: `${setBorderStyle(item.value)}`,
              width: !this.props.isSmallCart ? '32px' : '16px',
              height: !this.props.isSmallCart ? '32px' : '16px',
            }}></li>
        );
      }
      return (
        <li
          key={idx}
          className={
            (value === item.value ? `${s.item} ${s.active} ` : s.item) + ' ' + this.setClassName()
          }
          style={{
            width: this.props.isSmallCart ? '24px' : '63px',
            height: this.props.isSmallCart ? '24px' : '45px',
          }}>
          <span className={this.props.isSmallCart ? s.itemSpan : ''}>{item.value}</span>
        </li>
      );
    });
  }

  setSelectedOption = (target: HTMLElement) => {
    if (this.props.selectable === false) return;
    const selectedOption: OptionItemT = getSelectedOption(target, this.props.options, this.ulRef);
    this.setState({ selectedOption });
    this.props.setSelectedAttribute({
      name: this.props.name,
      selectedItem: selectedOption,
    });
  };

  render() {
    return (
      <div className={s.root}>
        <h3 className={this.props.isSmallCart ? s.smallTitle : s.title}>{this.props.name}:</h3>
        <ul
          className={s.list}
          ref={this.ulRef}
          onClick={(e) => this.setSelectedOption(e.target as HTMLElement)}>
          {this.createOptionList()}
        </ul>
      </div>
    );
  }
}

const mapState = (state: ProductItemOptionStateFromStoreI) => ({
  items: state.cart.items,
});

const mapDispatch = {
  setSelectedAttribute,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ProductItemOption);
