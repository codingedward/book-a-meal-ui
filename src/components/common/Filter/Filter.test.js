import React from 'react';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests'; // order matters!
import Filter from './Filter';
import Adapter from 'enzyme-adapter-react-16';


describe('<Filter />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Filter/>);
        expect(wrapper).toMatchSnapshot();
    });
});

