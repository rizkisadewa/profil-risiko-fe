import {
  FETCH_ALL_INGREDIENTS_REQUEST,
  FETCH_ALL_INGREDIENTS_FAILURE,
  FETCH_ALL_INGREDIENTS_SUCCESS
} from '../../constants/ActionTypes';

const initialState = {
  ingredientsdata: [],
  loading: false,
  error: ''
}

const Ingredients = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_INGREDIENTS_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case FETCH_ALL_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        ingredientsdata: action.payload,
        error: ''
      }
    }

    case FETCH_ALL_INGREDIENTS_FAILURE: {
      return {
        ...state,
        loading: false,
        ingredientsdata: [],
        error: action.payload
      }
    }

    default:
      return state

  }
}

export default Ingredients;
