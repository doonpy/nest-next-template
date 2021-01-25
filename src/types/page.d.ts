import { NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

declare global {
  export interface CommonPageProps {
    title: string;
  }

  export interface Layout<P> {
    Layout?: React.FC<P>;
  }

  export type PageWithLayout<
    P extends CommonPageProps = CommonPageProps,
    LP extends CommonPageProps = CommonPageProps,
    Q extends ParsedUrlQuery = Record<string, any>
  > = NextPage<P, Q> & Layout<LP>;
}

export {};
