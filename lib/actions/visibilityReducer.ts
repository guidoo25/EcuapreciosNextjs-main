import { TOGGLE_CATEGORIES } from './reducer';

const initialState = {
  categoriesVisible: false
};

const visibilityReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case TOGGLE_CATEGORIES:
      return {
        ...state,
        categoriesVisible: !state.categoriesVisible
      };
    default:
      return state;
  }
};

export default visibilityReducer;
