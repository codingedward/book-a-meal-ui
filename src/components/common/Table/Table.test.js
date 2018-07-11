import React from 'react';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests'; // order matters!
import Table from './Table';
import Adapter from 'enzyme-adapter-react-16';
import { EntryType } from 'src/constants';

const data = {
    columns: [
        {
            type: EntryType.TEXT,
            key: 'name',
            title: 'Name',
        }
    ],
    rows: [ { name: 'John Doe' } ]
}

describe('<Table />', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Table data={data} />);
        expect(wrapper).toMatchSnapshot();
    });
});

