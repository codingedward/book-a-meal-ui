import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Meals from '../../components/views/admin/Meals';
import { 
    editMeal,
    fetchMeals, 
    createMeal, 
    deleteMeal,
    resetEditStatus,
    resetCreateStatus,
    resetDeleteStatus,
    resetFetchStatus
} from '../../actions/MealsActions';

const mapStateToProps = (state) =>  {
    return {
        meals: state.meals
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        redirect: (page) => dispatch(push(page)),
        fetchMeals: (params) => dispatch(fetchMeals(params)),
        createMeal: (meal) => dispatch(createMeal(meal)),
        editMeal: (meal) => dispatch(editMeal(meal)),
        deleteMeal: (meal) =>  dispatch(deleteMeal(meal)),
        // reset error responses
        resetEditStatus: () => dispatch(resetEditStatus()),
        resetDeleteStatus: () => dispatch(resetDeleteStatus()),
        resetFetchStatus: () => dispatch(resetFetchStatus()),
        resetCreateStatus: () => dispatch(resetCreateStatus()),
    }
}

const MealsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Meals)


export default MealsContainer;

