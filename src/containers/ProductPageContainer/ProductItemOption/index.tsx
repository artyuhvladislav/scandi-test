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
            }}></li>
        );
      }
      return (
        <li key={idx} className={value === item.value ? `${s.item} ${s.active}` : s.item}>
          <span>{item.value}</span>
        </li>
      );
    });
  }

  setSelectedOption = (target: HTMLElement) => {
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
        <h3 className={s.title}>{this.props.name}:</h3>
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
