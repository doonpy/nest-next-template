import React from 'react';

import Header from '../header/Header';

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default DefaultLayout;
