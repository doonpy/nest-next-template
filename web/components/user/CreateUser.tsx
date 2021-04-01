import { useMutation } from '@apollo/client';
import React, { ChangeEvent, MouseEvent, useState } from 'react';

import UserService from '@/libs/user/UserService';

const CreateUser: React.VFC = () => {
  const userService = new UserService();
  const [input, setInput] = useState<UserCreateInput>({ name: '', age: NaN });
  const [createUser] = useMutation<{ createUser: User }, { input: UserCreateInput }>(
    userService.getCreateUserMutation()
  );

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setInput({ ...input, [name]: name === 'age' ? parseInt(value) : value });
  };

  const onSubmit = async (event: MouseEvent<HTMLInputElement>) => {
    try {
      event.preventDefault();
      await createUser({ variables: { input } });
      alert('OK!');
    } catch (error) {
      alert(error.response.data.message || error.message);
    }
  };

  return (
    <form>
      <input
        type={'text'}
        name={'name'}
        defaultValue={input.name}
        placeholder={'Name'}
        onChange={onChange}
      />
      <input type={'number'} name={'age'} placeholder={'Age'} onChange={onChange} />
      <input type={'submit'} title={'Add'} onClick={onSubmit} />
    </form>
  );
};

export default CreateUser;
