import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { signUpAct } from '../actions/AuthActions';
import Register from '../components/views/Register';

const mapStateToProps = (state) =>  {
    return {
        response: state.auth.signUp
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (credentials) => {
            dispatch(signUpAct(credentials))
        },
        redirect: (page) => {
            dispatch(push(page))
        }
    }
}

const RegisterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Register)


export default RegisterContainer;
