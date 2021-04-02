import Head from 'next/head';
import React from 'react';

interface ComponentProps {
  title: string;
}

const Header: React.FC<ComponentProps> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default Header;
