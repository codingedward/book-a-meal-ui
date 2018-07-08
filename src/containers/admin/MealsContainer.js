import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Meals from '../../components/views/admin/Meals';
import { fetchMeals, createMeal, editMeal } from '../../actions/MealsActions';

const mapStateToProps = (state) =>  {
    return {
        meals: state.meals
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMeals: () => {
            dispatch(fetchMeals())
        },
        redirect: (page) => {
            dispatch(push(page))
        },
        createMeal: (meal) => {
            dispatch(createMeal(meal))
        },
        editMeal: (meal) => {
            dispatch(editMeal(meal))
        }
    }
}

const MealsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Meals)


export default MealsContainer;

