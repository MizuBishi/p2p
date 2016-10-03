import {
  RECEIVE_RATING,
  REQUEST_RATING,
} from '../actions/myrating.js';

const initialState = {
  members: [],
  isFetching: false,
  didInvalidate: false,
};

const reducer = (state = initialState, action) => {
  const { type, ...params } = action;
  switch (type) {
    case REQUEST_RATING:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_RATING:
      return {
        ...state,
        ...params,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default reducer;
