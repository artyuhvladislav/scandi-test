import React from 'react';
import { down } from '../../assets/icons/index';
import { CurrencyItemT } from '../../redux/slices/headerSlice/headerSliceTypes';
import s from './select.module.scss';

interface SelectPropsI {
  options: CurrencyItemT[];
  currentOption: CurrencyItemT;
  isOpen: boolean;
  selectRef: React.RefObject<HTMLDivElement>;
  toggleListVisibility: () => void;
  checkIfClickedOutside: (e: Event) => void;
  setSelectedOption: (value: HTMLElement) => void;
}
class Select extends React.Component<SelectPropsI> {
  render() {
    return (
      <div className={s.root} ref={this.props.selectRef}>
        <div className={s.header} onClick={this.props.toggleListVisibility}>
          <span>{this.props.currentOption?.symbol}</span>
          <img
            className={this.props.isOpen ? s.arrowActive : s.arrow}
            src={down}
            alt="show / hide"
          />
        </div>
        {this.props.isOpen && (
          <ul
            className={s.list}
            onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
              this.props.setSelectedOption(e.target as HTMLElement);
            }}>
            {this.props.options.map((option, idx) => (
              <li key={idx} className={s.item}>
                {`${option?.symbol} ${option?.label}`}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Select;
