import store from "./store";
import * as actions from "./actions";

export const getPosts = () => {
  return (dispatch) => {
    dispatch(actions.setLoading());
    fetch("https://www.reddit.com/.json", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then(({ data }) => {
        dispatch(actions.getPosts(data.children));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};


