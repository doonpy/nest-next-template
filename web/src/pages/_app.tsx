import { ApolloProvider } from '@apollo/client';
import React, { useMemo } from 'react';

import ApolloClient from '../libs/graphql/ApolloClient';

export function useApollo(initialState: any) {
  return useMemo(() => ApolloClient.getInstance(initialState), [initialState]);
}

const MyApp = ({ Component, pageProps }: { Component: PageWithLayout; pageProps: PageState }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient.getClient()}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;
