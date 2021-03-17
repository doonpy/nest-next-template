import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

const MyApp = ({ Component, pageProps }: { Component: PageWithLayout; pageProps: PageState }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
