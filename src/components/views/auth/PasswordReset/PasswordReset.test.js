import React from 'react';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests'; // order matters!
import PasswordReset from './PasswordReset';

describe('<PasswordReset />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<PasswordReset/>);
        expect(wrapper).toMatchSnapshot();
    });
});

