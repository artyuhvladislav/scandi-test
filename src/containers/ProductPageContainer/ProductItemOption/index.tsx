import React from 'react';
import { getSelectedOption, setBorderStyle } from '../../../utils';
import s from './productItemOption.module.scss';

export type OptionItemT = {
  value: string;
};

interface ProductItemOptionPropsI {
  name: string;
  options: OptionItemT[];
}

interface ProductItemOptionStateI {
  optionName: string;
  selectedOption: OptionItemT;
}

class ProductItemOption extends React.Component<ProductItemOptionPropsI, ProductItemOptionStateI> {
  ulRef = React.createRef<HTMLUListElement>();
  state = {
    optionName: 'Color',
    selectedOption: {
      value: '',
    },
  };

  createOptionList() {
    return this.props.options.map((item, idx) => {
      const { value } = this.state.selectedOption;
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
    // @ts-ignore
    const selectedOption: OptionItemT = getSelectedOption(target, this.props.options, this.ulRef);
    this.setState({ selectedOption });
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

export default ProductItemOption;
