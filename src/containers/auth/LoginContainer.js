import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { loginAct } from 'src/actions/AuthActions';
import Login from 'src/components/views/auth/Login';

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
