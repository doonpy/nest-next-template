import '~/styles/user.scss';

import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import Header from '~/components/header/Header';
import UsersAction from '~/redux/actions/UsersAction';
import UserService from '~/services/user/UserService';
import { errorHandler } from '~/services/utils';
const CreateUser: React.FC = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<CreateUserInput>({ name: '', age: NaN });

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event: MouseEvent<HTMLInputElement>) => {
    try {
      event.preventDefault();
      const userService = UserService.getInstance();
      const res = await userService.createUser(user);
      if (res.data) {
        dispatch(UsersAction.getInstance().updateThunk([res.data.user]));
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className="wrap-user">
      <Header />
      <form>
        <input
          className="mr-2"
          type={'text'}
          name={'name'}
          defaultValue={user.name}
          placeholder={'Name'}
          onChange={onChange}
        />
        <input type={'number'} name={'age'} placeholder={'Age'} onChange={onChange} />
        <input type={'submit'} title={'Add'} onClick={onSubmit} />
      </form>
    </div>
  );
};

export default CreateUser;
