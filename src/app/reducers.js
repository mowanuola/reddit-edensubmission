import {
  GET_POSTS,
  FILTER_POSTS,
  SEARCH_POSTS,
  TOGGLE_POSTS,
  SET_LOADING,
} from "./actionTypes";

const initialState = {
  posts: [],
  search: "",
  loading: false,
};
const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case SEARCH_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default postReducer;
