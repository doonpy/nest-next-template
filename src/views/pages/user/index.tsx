import React from 'react';

import DefaultLayout from '../../components/layouts/DefaultLayout';
import CreateUser from '../../components/user/CreateUser';
import UserList from '../../components/user/UserList';
import PageAction, { PageActionTypes } from '../../redux/actions/PageAction';
import RootStore from '../../redux/store/RootStore';

const wrapper = RootStore.getInstance().getWrapper();

const Page: PageWithLayout = () => {
  return (
    <DefaultLayout>
      <UserList />
      <br />
      <CreateUser />
    </DefaultLayout>
  );
};

export const getStaticProps = wrapper.getStaticProps(({ store }) => {
  const pageAction = PageAction.getInstance();
  store.dispatch<CustomAction<PageActionTypes, PageState>>(
    pageAction.setPageState({ title: 'UserEntity' })
  );
});

export default wrapper.withRedux(Page);
