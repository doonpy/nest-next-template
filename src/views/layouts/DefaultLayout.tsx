import React from 'react';

import Header from '../components/header/Header';

interface LayoutProps extends CommonPageProps {
  [key: string]: any;
}

const DefaultLayout: React.FC<LayoutProps> = ({ children, ...props }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default DefaultLayout;
