import { shallow } from 'enzyme';
import React from 'react';

import Header from '../../header/Header';
import DefaultLayout from '../DefaultLayout';

describe('DefaultLayout', () => {
  const title = 'test title';
  const children = <div>Children</div>;

  it('should render correctly', () => {
    const component = shallow(<DefaultLayout title={title}>{children}</DefaultLayout>);

    expect(component).toMatchSnapshot();
  });

  it('should contains correctly children', () => {
    const headerChildren = <Header title={title} />;
    const component = shallow(<DefaultLayout title={title}>{children}</DefaultLayout>);

    expect(component.contains(children)).toBeTruthy();
    expect(component.contains(headerChildren)).toBeTruthy();
  });
});
