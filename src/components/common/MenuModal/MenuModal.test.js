import React from 'react';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests'; // order matters!
import Modal from './Modal';
import Adapter from 'enzyme-adapter-react-16';

describe('<Modal />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Modal />);
        expect(wrapper).toMatchSnapshot();
    });
});



