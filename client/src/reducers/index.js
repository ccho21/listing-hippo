import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import productsReducer from './productsReducer';

export default combineReducers({
    form: reduxForm,
    products: productsReducer
});
