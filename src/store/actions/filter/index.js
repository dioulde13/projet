export const GET_FILTER = "GET_FILTER";

export const getFilterTerm = (payload) => (dispatch) => {
  dispatch({
    type: GET_FILTER,
    payload,
  });
};
