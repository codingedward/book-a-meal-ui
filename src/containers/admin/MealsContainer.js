import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Meals from '../../components/views/admin/Meals';
import { getMealsAct } from '../../actions/MealsActions';

const mapStateToProps = (state) =>  {
    return {
        response: state.meals
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMeals: () => {
            dispatch(getMealsAct())
        },
        redirect: (page) => {
            dispatch(push(page))
        }
    }
}

const MealsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Meals)


export default MealsContainer;

