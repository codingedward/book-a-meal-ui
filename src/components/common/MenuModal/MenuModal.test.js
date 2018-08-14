import React from 'react';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests'; // order matters!
import MenuModal from './MenuModal';
import Adapter from 'enzyme-adapter-react-16';

describe('<MenuModal />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<MenuModal />);
        expect(wrapper).toMatchSnapshot();
    });
});



