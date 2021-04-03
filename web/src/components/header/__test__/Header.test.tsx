import { shallow } from 'enzyme';
import React from 'react';

import Header from '../Header';

describe('Header', () => {
  const title = 'test title';

  it('should render with correct title', () => {
    const component = shallow(<Header title={title} />);

    expect(component.contains(<title>{title}</title>)).toBeTruthy();
  });

  it('should render correctly', () => {
    const component = shallow(<Header title={title} />);

    expect(component).toMatchSnapshot();
  });
});
