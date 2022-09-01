import React from 'react';
import {
  getCurrency,
  setCurrencies,
  setCurrentCurrency,
} from '../../redux/slices/headerSlice/headerSlice';
import { connect, ConnectedProps } from 'react-redux';
import SelectContainer from '../SelectContainer';
import { CurrencyItemT, HeaderStateI } from '../../redux/slices/headerSlice/headerSliceTypes';
import { setTotalPrice } from '../../redux/slices/cartSlice/cartSlice';

interface CurrencyContainerPropsI extends PropsFromRedux {
  currencies: CurrencyItemT[];
  currentCurrency: CurrencyItemT;
}

type CurrencyContainerStateT = {
  header: HeaderStateI;
};

class CurrencyContainer extends React.Component<CurrencyContainerPropsI> {
  componentDidMount() {
    this.props.getCurrency().then(({ payload }) => {
      this.props.setCurrencies(payload as CurrencyItemT[]);
    });
  }
  render() {
    return (
      <SelectContainer
        options={this.props.currencies}
        currentOption={this.props.currentCurrency}
        setCurrentCurrency={this.props.setCurrentCurrency}
        setTotalPrice={this.props.setTotalPrice}
      />
    );
  }
}

const mapState = (state: CurrencyContainerStateT) => ({
  currencies: state.header.currencies,
  currentCurrency: state.header.currentCurrency,
});

const mapDispatch = {
  setCurrencies,
  setCurrentCurrency,
  getCurrency,
  setTotalPrice,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CurrencyContainer);
