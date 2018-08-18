import React from 'react';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests'; 
import MealsTable from './MealsTable';
import Adapter from 'enzyme-adapter-react-16';

const props = {
    data: {
        meals: [{
            id: 1,
            img_url: '#',
            name: 'ugali',
            cost: 20,
            created_at: '', 
        }]
    },
    onNext: () => {},
    onPrev: () => {},
};

describe('<MealsTable />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<MealsTable {...props}/>);
        expect(wrapper).toMatchSnapshot();
    });
});
