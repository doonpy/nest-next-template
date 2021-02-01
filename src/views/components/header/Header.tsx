import Head from 'next/head';
import React from 'react';
import { useSelector } from 'react-redux';

import PageReducer from '../../redux/reducers/PageReducer';

const Header: React.FC = () => {
  const pageReducer = PageReducer.getInstance();
  const pageState = useSelector<RootState, PageState>(
    (state) => state[pageReducer.getReducerKey()]
  );

  return (
    <Head>
      <title>{pageState.title}</title>
    </Head>
  );
};

export default Header;
