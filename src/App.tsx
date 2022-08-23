import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import './App.scss';
import { Category, Header } from './components';
import { Cart } from './pages';
import { CurrencyContainer } from './containers';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});
class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="container">
          <Header />
          {/* <Cart /> */}
          <Category />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
