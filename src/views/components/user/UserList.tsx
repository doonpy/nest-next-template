import { gql, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import UsersAction from '../../redux/actions/UsersAction';
import { errorHandler } from '../../services/utils';

const UserList: React.FC = () => {
  const dispatch = useDispatch();
  const usersState = useSelector<RootState, UsersState>((state) => state.users as UsersState);
  const { loading, error, data } = useQuery(
    gql`
      query allUsers {
        users {
          id
          name
          age
        }
      }
    `,
    {
      variables: { limit: 1 }
    }
  );

  useEffect(() => {
    if (!data) return;
    const usersAction = UsersAction.getInstance();
    try {
      dispatch(usersAction.fetch(data.users, data.users.length));
    } catch (error) {
      errorHandler(error);
    }
  }, [data]);

  if (loading || error) {
    return <div>Loading</div>;
  }

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
