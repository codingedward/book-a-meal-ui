import React from 'react';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests'; // order matters!
import Sidebar from './Sidebar';
import Adapter from 'enzyme-adapter-react-16';

describe('<Sidebar />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Sidebar />);
        expect(wrapper).toMatchSnapshot();
    });
});





