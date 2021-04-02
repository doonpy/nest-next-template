import { GetStaticProps } from 'next';
import React from 'react';

import DefaultLayout from '../../components/layouts/DefaultLayout';
import UserList from '../../components/user/UserList';

export const getStaticProps: GetStaticProps<PageState> = async () => {
  return { props: { title: 'User' } };
};

const Page: PageWithLayout = ({ title }) => {
  return (
    <DefaultLayout title={title}>
      <UserList />
    </DefaultLayout>
  );
};

export default Page;
