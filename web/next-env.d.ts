import 'next';
import 'next/types/global';
import 'libs/**/*.d.ts';

import { NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

declare global {
  export interface PageState {
    initialApolloState?: any;
    title: string;
  }

  export interface Layout {
    Layout?: React.FC;
  }

  export type PageWithLayout<
    P extends PageState = PageState,
    Q extends ParsedUrlQuery = Record<string, any>
  > = NextPage<P, Q> & Layout;
}

export {};
