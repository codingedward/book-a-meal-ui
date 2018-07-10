import React from 'react';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests'; // order matters!
import MenuItem from './MenuItem';
import Adapter from 'enzyme-adapter-react-16';

const item = {
    name: 'name2',
    cost: 50,
    img_url: '#'
}

describe('<MenuItem />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<MenuItem item={item} />);
        expect(wrapper).toMatchSnapshot();
    });
});



