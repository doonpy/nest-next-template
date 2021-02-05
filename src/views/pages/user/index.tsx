import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CreateUser from '../../components/user/CreateUser';
import DefaultLayout from '../../layouts/DefaultLayout';
import PageAction, { PageActionTypes } from '../../redux/actions/PageAction';
import UsersAction from '../../redux/actions/UsersAction';
import RootStore from '../../redux/store/RootStore';
import { errorHandler } from '../../services/utils';

const wrapper = RootStore.getInstance().getWrapper();

const Page: PageWithLayout = () => {
  const dispatch = useDispatch();
  const usersState = useSelector<RootState, UsersState>((state) => state.users as UsersState);

  useEffect(() => {
    const usersAction = UsersAction.getInstance();
    try {
      dispatch(usersAction.fetchThunk());
    } catch (error) {
      errorHandler(error);
    }
  }, []);

  return (
    <DefaultLayout>
      <ul>
        {usersState.list.map((user, index) => {
          return (
            <li key={index}>
              Id: {user.id} - Name: {user.name} - Age: {user.age}
            </li>
          );
        })}
      </ul>
      <br />
      <CreateUser />
    </DefaultLayout>
  );
};

export const getStaticProps = wrapper.getStaticProps(({ store }) => {
  const pageAction = PageAction.getInstance();
  store.dispatch<CustomAction<PageActionTypes, PageState>>(
    pageAction.setPageState({ title: 'User' })
  );
});

export default wrapper.withRedux(Page);
