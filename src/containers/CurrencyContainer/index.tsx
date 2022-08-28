import React from 'react';
import {
  getCurrency,
  setCurrencies,
  setCurrentCurrency,
} from '../../redux/slices/headerSlice/headerSlice';
import { connect, ConnectedProps } from 'react-redux';
import SelectContainer from '../SelectContainer';
import {
  CurrencyItemT,
  HeaderStateI,
  Status,
} from '../../redux/slices/headerSlice/headerSliceTypes';

interface CurrencyContainerPropsI extends PropsFromRedux {
  currencies: CurrencyItemT[];
  currentCurrency: CurrencyItemT;
  status: Status;
}

type CurrencyContainerStateT = {
  header: HeaderStateI;
};

type CurrencyData = {
  data: {
    currencies: CurrencyItemT[];
  };
};

class CurrencyContainer extends React.Component<CurrencyContainerPropsI> {
  componentDidMount() {
    this.props.getCurrency().then(({ payload }) => {
      // @ts-ignore
      const data = payload.data.currencies as CurrencyItemT[];
      this.props.setCurrencies(data);
    });
  }
  render() {
    return (
      <SelectContainer
        options={this.props.currencies}
        currentOption={this.props.currentCurrency}
        setCurrentCurrency={this.props.setCurrentCurrency}
      />
    );
  }
}

const mapState = (state: CurrencyContainerStateT) => ({
  currencies: state.header.currencies,
  currentCurrency: state.header.currentCurrency,
  status: state.header.status,
});

const mapDispatch = {
  setCurrencies,
  setCurrentCurrency,
  getCurrency,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CurrencyContainer);
