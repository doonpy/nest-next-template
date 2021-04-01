import React from 'react';

import Header from '../header/Header';

const DefaultLayout: React.FC<PageState> = ({ children, title }) => {
  return (
    <>
      <Header title={title} />
      {children}
    </>
  );
};

export default DefaultLayout;
