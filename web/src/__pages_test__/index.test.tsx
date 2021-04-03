import { shallow } from 'enzyme';
import React from 'react';

import Home from '../pages';

describe('index', () => {
  it('should render correctly', () => {
    const component = shallow(<Home />);

    expect(component).toMatchSnapshot();
  });
});
