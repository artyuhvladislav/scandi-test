import React from 'react';
import { down } from '../../assets/icons/index';
import s from './select.module.scss';
import { SelectPropsI, SelectStateI } from './Select.type';

class Select extends React.Component<SelectPropsI, SelectStateI> {
  private selectRef = React.createRef<HTMLDivElement>();

  state: SelectStateI = {
    options: this.props.options,
    currentValue: this.props.options[0].slice(0, 1),
    isOpen: false,
  };

  checkIfClickedOutside = (e: Event) => {
    if (
      this.state.isOpen &&
      this.selectRef.current &&
      !this.selectRef.current.contains(e.target as HTMLElement)
    ) {
      this.setState({ isOpen: false });
    }
  };

  componentDidMount() {
    document.addEventListener('click', this.checkIfClickedOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.checkIfClickedOutside);
  }

  toggleListVisibility = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  setSelectedOption = (value: HTMLElement) => {
    if (value.textContent) {
      const text = value.textContent.slice(0, 1);
      this.setState({ currentValue: text });
    }
    this.toggleListVisibility();
  };

  render() {
    return (
      <div className={s.root} ref={this.selectRef}>
        <div className={s.header} onClick={this.toggleListVisibility}>
          <span>{this.state.currentValue}</span>
          <img
            className={this.state.isOpen ? s.arrowActive : s.arrow}
            src={down}
            alt="show / hide"
          />
        </div>
        {this.state.isOpen && (
          <ul
            className={s.list}
            onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
              this.setSelectedOption(e.target as HTMLElement);
            }}>
            {this.state.options.map((option, idx) => (
              <li key={idx} className={s.item}>
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Select;
