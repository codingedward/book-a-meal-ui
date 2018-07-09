import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { signUpAct } from 'src/actions/AuthActions';
import Register from 'src/components/views/auth/Register';

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
