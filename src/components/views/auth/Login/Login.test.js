import React from 'react';
import Enzyme, { shallow }  from 'enzyme';
import 'src/utils/mockLocalStorage'; // order matters!
import Login from './Login';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

const loginProps = {
    response: {
        payload: {}
    },
    redirect: () => {},
    login: () => {},
}

describe('<Login />', () => {
    it('renders correctly', () => {
        const login = shallow(<Login {...loginProps} />);
        expect(login.find('input').length).toBe(2);
        expect(login.find('.btn').length).toBe(1);
    });
    it('shows errors', () => {
        const propsWithError = {
            ...loginProps,
            response: {
                error: {data:{ message: 'Invalid' }}
            }
        }
        const login = shallow(<Login {...propsWithError}/>);
        expect(login.find('.alert').length).toBe(1);
    })
});

