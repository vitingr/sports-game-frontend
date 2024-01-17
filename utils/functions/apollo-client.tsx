"use client"

import { ApolloClient, InMemoryCache } from '@apollo/client';

export const createApolloClient = () => {
  return new ApolloClient({
    uri: 'https://pifa-websocket-api.vercel.app/graphql',
    cache: new InMemoryCache({ addTypename: false }),
    ssrMode: typeof window === 'undefined',
  });
};