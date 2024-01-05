"use client"

import { ApolloClient, InMemoryCache } from '@apollo/client';

export const createApolloClient = () => {
  return new ApolloClient({
    uri: 'http://localhost:3030/graphql',
    cache: new InMemoryCache({ addTypename: false }),
    ssrMode: typeof window === 'undefined',
  });
};