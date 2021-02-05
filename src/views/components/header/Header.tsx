import Head from 'next/head';
import React from 'react';
import { useSelector } from 'react-redux';

const Header: React.FC = () => {
  const pageState = useSelector<RootState, PageState>((state) => state.page as PageState);

  return (
    <Head>
      <title>{pageState.title}</title>
    </Head>
  );
};

export default Header;
