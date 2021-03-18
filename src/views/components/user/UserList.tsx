import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { errorHandler } from '~/services/utils';

import UsersAction from '../../redux/actions/UsersAction';

const UserList: React.FC = () => {
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
    <ul>
      {usersState.list.map((user, index) => {
        return (
          <li key={index}>
            Id: {user.id} - Name: {user.name} - Age: {user.age}
          </li>
        );
      })}
    </ul>
  );
};

export default UserList;
