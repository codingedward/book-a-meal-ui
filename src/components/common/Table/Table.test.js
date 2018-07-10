import React from 'react';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests'; // order matters!
import Table from './Table';
import Adapter from 'enzyme-adapter-react-16';

describe('<Table />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Table />);
        expect(wrapper).toMatchSnapshot();
    });
});

