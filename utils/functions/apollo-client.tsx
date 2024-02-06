"use client"

import { ApolloClient, InMemoryCache } from '@apollo/client';

export const createApolloClient = () => {
  return new ApolloClient({
    uri: 'https://pifa-nest-api.onrender.com/graphql',
    // uri: "http://localhost:3030/graphql",
    cache: new InMemoryCache({ addTypename: false }),
    ssrMode: typeof window === 'undefined',
  });
};