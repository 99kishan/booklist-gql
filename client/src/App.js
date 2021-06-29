import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

const client = new ApolloClient({
  uri:'http://localhost:5000/graphql',
  cache: new InMemoryCache({typePolicies:{}})
});


function App() {
  return (
    <ApolloProvider client={client}>
    <div>
     <h1 className='head'>List of Books</h1>
     <BookList/>
     <AddBook/>
    </div>
    </ApolloProvider>
  );
}

export default App;
