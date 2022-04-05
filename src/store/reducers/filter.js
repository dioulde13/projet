import { GET_FILTER } from "../actions/filter";

// const initialState = {
//     // category: "Any",
//     // sub_category: "Any",
//     // program_type: "Any",
//     // time_of_day: "Any",
//     // keywords: "Any"
//     filter: {}
// }

const reducer = (state =null, action) => {
  switch (action.type) {
    case GET_FILTER:
      return action.payload ;
    default:
      return state;
  }
};

export default reducer;
