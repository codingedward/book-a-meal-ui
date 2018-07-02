import { connect } from 'react-redux';
import { authenticate } from '../actions/AuthActions';
import Login from '../components/views/Login';

const mapStateToProps = (state) =>  {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: (credentials) => {
            dispatch(authenticate(credentials))
        }
    }
}

const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)


export default LoginContainer;
