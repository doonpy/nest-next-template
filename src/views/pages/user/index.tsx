import { GetStaticProps } from 'next';
import React from 'react';

import DefaultLayout from '../../layouts/DefaultLayout';

const Home: PageWithLayout = () => {
  return <div>User</div>;
};

export const getStaticProps: GetStaticProps<CommonPageProps> = async () => {
  return {
    props: {
      title: 'Sample'
    }
  };
};

Home.Layout = DefaultLayout;

export default Home;
