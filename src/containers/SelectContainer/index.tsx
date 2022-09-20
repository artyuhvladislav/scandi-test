import React from 'react';
import { Select } from '../../components';
import { CurrencyItemT } from '../../redux/slices/headerSlice/headerSliceTypes';

export interface SelectContainerStateI {
  isOpen: boolean;
}

interface SelectContainerPropsI {
  options: CurrencyItemT[];
  currentOption: CurrencyItemT;
  setCurrentCurrency: (obj: CurrencyItemT) => void;
  setTotalPrice: (obj: CurrencyItemT) => void;
}

class SelectContainer extends React.Component<SelectContainerPropsI> {
  selectRef = React.createRef<HTMLDivElement>();

  state: SelectContainerStateI = {
    isOpen: false,
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

  checkIfClickedOutside = (e: Event) => {
    if (
      this.state.isOpen &&
      this.selectRef.current &&
      !this.selectRef.current.contains(e.target as HTMLElement)
    ) {
      debugger;
      this.setState({ isOpen: false });
    }
  };

  setSelectedOption = (value: HTMLElement) => {
    if (value.textContent) {
      const [symbol, label] = value.textContent.split(' ');
      const payload = {
        symbol,
        label,
      };
      this.props.setCurrentCurrency(payload);
      this.props.setTotalPrice(payload);
    }
    this.toggleListVisibility();
  };

  render() {
    return (
      <Select
        options={this.props.options}
        currentOption={this.props.currentOption}
        isOpen={this.state.isOpen}
        selectRef={this.selectRef}
        setSelectedOption={this.setSelectedOption}
        checkIfClickedOutside={this.checkIfClickedOutside}
        toggleListVisibility={this.toggleListVisibility}
      />
    );
  }
}

export default SelectContainer;
