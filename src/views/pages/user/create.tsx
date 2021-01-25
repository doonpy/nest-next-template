import { NextPage } from 'next';
import React from 'react';

const Page: NextPage<any> = () => {
  return (
    <form>
      <input type={'text'} name={'name'} defaultValue={'test'} placeholder={'Name'} />
      <input type={'number'} name={'age'} defaultValue={1} placeholder={'Age'} />
      <input type={'submit'} title={'Submit'} />
    </form>
  );
};

export default Page;
