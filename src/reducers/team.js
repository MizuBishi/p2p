import {
  RECEIVE_TEAM,
  REQUEST_TEAM,
  UPDATE_TEAM,
  ERROR_RESET_TEAMMEMBER,
} from '../actions/team.js';

const initialState = {
  members: [],
  isFetching: false,
  fetched: false,
};

const reducer = (state = initialState, action) => {
  const { type, ...params } = action;

  switch (type) {
    case REQUEST_TEAM:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_TEAM:
      return {
        ...state,
        ...params,
        isFetching: false,
      };
    case UPDATE_TEAM:
      return {
        ...state,
        members: state.members.map(member =>
          (member.id === action.member.id ? action.member : member)
        ),
      };
    case ERROR_RESET_TEAMMEMBER:
      return {
        ...state,
        members: state.members.map(m => (m.id === action.member.id ? action.member : m)),
      };
    default:
      return state;
  }
};

export default reducer;