import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import './App.scss';
import { Header } from './components';
import HomePageContainer from './containers/HomePageContainer';
import { BASE_URL } from './constants';

const client = new ApolloClient({
  uri: BASE_URL,
  cache: new InMemoryCache(),
});
class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="container">
          <Header />
          <HomePageContainer />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
