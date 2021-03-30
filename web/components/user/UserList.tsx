import { useQuery } from '@apollo/client';
import React from 'react';

import CreateUser from '@/components/user/CreateUser';
import UserService from '@/libs/user/UserService';

const UserList: React.VFC = () => {
  const userService = new UserService();
  const { loading, error, data, refetch } = useQuery<{ users: User[] }>(
    userService.getUsersQuery()
  );

  if (loading) return <div>Loading</div>;

  if (error) return <div>{`Error! ${error}`}</div>;

  return (
    <>
      <button onClick={() => refetch()}>Refresh!</button>
      <ul>
        {data.users.map((user, index) => {
          return (
            <li key={index}>
              Id: {user.id} - Name: {user.name} - Age: {user.age}
            </li>
          );
        })}
      </ul>
      <br />
      <CreateUser />
    </>
  );
};

export default UserList;
