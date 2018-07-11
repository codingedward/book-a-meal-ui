import React from 'react';
import ReactDOM from 'react-dom';
import { shallow }  from 'enzyme';
import 'src/utils/bootTests'; // order matters!
import AuthPage from './AuthPage';
import Adapter from 'enzyme-adapter-react-16';


describe('<AuthPage />', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<AuthPage />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it('renders correctly', () => {
        const wrapper = shallow(<AuthPage/>);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders the title', () => {
        const wrapper = shallow(<AuthPage/>);
        expect(wrapper.find('.logo-small').text()).toEqual('BAM!')
    });
});

