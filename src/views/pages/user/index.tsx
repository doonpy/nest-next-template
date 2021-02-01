import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DefaultLayout from '../../layouts/DefaultLayout';
import PageAction, { PageActionTypes } from '../../redux/actions/PageAction';
import UsersAction from '../../redux/actions/UsersAction';
import UsersReducer from '../../redux/reducers/UsersReducer';
import RootStore from '../../redux/store/RootStore';

const wrapper = RootStore.getInstance().getWrapper();

const Home: PageWithLayout = () => {
  const dispatch = useDispatch();
  const usersReducer = UsersReducer.getInstance();
  const usersState = useSelector<RootState, UsersState>(
    (state) => state[usersReducer.getReducerKey()]
  );

  useEffect(() => {
    const usersAction = UsersAction.getInstance();
    dispatch(usersAction.fetchUsersThunk());
  }, []);

  return (
    <DefaultLayout>
      <div>{JSON.stringify(usersState)}</div>
    </DefaultLayout>
  );
};

export const getStaticProps = wrapper.getStaticProps(({ store }) => {
  const pageAction = PageAction.getInstance();
  store.dispatch<CustomAction<PageActionTypes, PageState>>(
    pageAction.setPageState({ title: 'Sample' })
  );
});

export default wrapper.withRedux(Home);
