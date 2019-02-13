import axios from 'axios';
import { FETCH_PRODUCTS } from './types';

export const fetchProducts = () => async dispatch => {
  const res = await axios.get('http://localhost:3000/product');

  dispatch({ type: FETCH_PRODUCTS, payload: res.data });
};
