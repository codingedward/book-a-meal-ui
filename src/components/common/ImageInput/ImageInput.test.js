import React from 'react';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests'; // order matters!
import ImageInput from './ImageInput';
import Adapter from 'enzyme-adapter-react-16';


describe('<ImageInput />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<ImageInput/>);
        expect(wrapper).toMatchSnapshot();
    });
});

