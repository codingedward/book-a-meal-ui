import React from 'react';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests'; // order matters!
import Paginator from './Paginator';
import Adapter from 'enzyme-adapter-react-16';

describe('<Paginator />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Paginator />);
        expect(wrapper).toMatchSnapshot();
    });
});




