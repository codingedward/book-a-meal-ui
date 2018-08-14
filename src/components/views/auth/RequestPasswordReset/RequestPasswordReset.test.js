import React from 'react';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests'; // order matters!
import RequestPasswordReset from './RequestPasswordReset';

describe('<RequestPasswordReset />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<RequestPasswordReset/>);
        expect(wrapper).toMatchSnapshot();
    });
});

