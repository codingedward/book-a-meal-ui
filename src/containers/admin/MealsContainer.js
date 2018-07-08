import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Meals from '../../components/views/admin/Meals';
import { 
    editMeal,
    fetchMeals, 
    createMeal, 
    deleteMeal
} from '../../actions/MealsActions';

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
        createMeal: (meal) => {
            dispatch(createMeal(meal))
        },
        editMeal: (meal) => {
            dispatch(editMeal(meal))
        },
        deleteMeal: (meal) => {
            dispatch(deleteMeal(meal))
        },
        redirect: (page) => {
            dispatch(push(page))
        },
    }
}

const MealsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Meals)


export default MealsContainer;

