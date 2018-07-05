import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { loginAct } from '../actions/AuthActions';
import Login from '../components/views/Login';

const mapStateToProps = (state) =>  {
    return {
        response: state.auth.login
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (credentials) => {
            dispatch(loginAct(credentials))
        },
        redirect: (page) => {
            dispatch(push(page))
        }
    }
}

const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)


export default LoginContainer;
