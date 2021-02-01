import React from 'react';

const MyApp = ({ Component, pageProps }: { Component: PageWithLayout; pageProps: PageState }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
