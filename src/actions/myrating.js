// Middleware
import { getMyRating } from '../middleware/getMyRating.mock.js';

// Actions
import { setTitle } from '../ui/layouts/app.jsx';
import { selectMember } from './member.js';

export const REQUEST_RATING = '/team/REQUEST_RATING';
export const RECEIVE_RATING = '/team/RECEIVE_RATING';
export const INVALIDATE_PROJECT = '/team/INVALIDATE_PROJECT';


export const showMemberRating = (member, props) => (dispatch) => {
  if (member.categories) {
    dispatch(setTitle(`My Rating from ${member.name}`));
    dispatch(selectMember(props.members.indexOf(member), props));
  } else {
    console.log('No Criterias defined');
  }
};

export const invalidateProject = project => ({
  type: INVALIDATE_PROJECT,
  project,
});

const requestTeam = project => ({
  type: REQUEST_RATING,
  project,
});

const receiveRating = (project, data) => ({
  type: RECEIVE_RATING,
  project,
  members: data.members,
});

const fetchTeam = project => (dispatch) => {
  dispatch(requestTeam(project));
  getMyRating(project, (data) => {
    console.log(data);
    dispatch(receiveRating(project, data));
  });
};

const shouldFetchRating = (state) => {
  if (!state.team) {
    return true;
  }
  return !state.team.isFetching;
};

export const fetchMyRatingIfNeeded = project => (dispatch, state) => {
  if (shouldFetchRating(state)) {
    dispatch(fetchTeam(project));
  }
};
