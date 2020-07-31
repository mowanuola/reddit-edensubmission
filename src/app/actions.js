import {
  GET_POSTS,
  FILTER_POSTS,
  SEARCH_POSTS,
  TOGGLE_POSTS,
  SET_LOADING,
} from "./actionTypes";

export const getPosts = (posts) => ({
  type: GET_POSTS,
  payload: { posts },
});
export const filterPosts = (filter) => ({
  type: FILTER_POSTS,
  payload: { filter },
});
export const searchPosts = (search) => ({
  type: SEARCH_POSTS,
  payload: { search },
});
export const togglePost = (query) => ({
  type: TOGGLE_POSTS,
  payload: { query },
});
export const setLoading = () => ({
  type: SET_LOADING,
});
