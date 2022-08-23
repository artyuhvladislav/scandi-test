import React from 'react';
import { gql } from '@apollo/client';
import {
  CurrencyItemT,
  getCurrency,
  HeaderStateI,
  setCurrencies,
  setCurrentCurrency,
  Status,
} from '../../redux/slices/headerSlice';
import { connect, ConnectedProps } from 'react-redux';
import SelectContainer from '../SelectContainer';

export const GET_CURRENCY_LIST = gql`
  query {
    currencies {
      symbol
      label
    }
  }
`;

interface CurrencyContainerPropsI extends PropsFromRedux {
  currencies: CurrencyItemT[];
  currentCurrency: CurrencyItemT;
  status: Status;
}

type CurrencyContainerStateT = {
  header: HeaderStateI;
};

class CurrencyContainer extends React.Component<CurrencyContainerPropsI> {
  componentDidMount() {
    this.props.getCurrency().then(({ payload }: any) => {
      this.props.setCurrencies(payload.data.currencies);
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
