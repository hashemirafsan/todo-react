import React, { Component } from 'react';
import Todo from './components/todo';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// const client = new ApolloClient({
//   uri: "http://localhost:8090/graphql"
// });

const client = new ApolloClient({
  uri: "https://todoapp-graphql.herokuapp.com/graphql"
});

class App extends Component {
  render() {
    return (
      <div className="App">
          <ApolloProvider client={client}>
            <Todo />
          </ApolloProvider>
      </div>
    );
  }
}

export default App;
