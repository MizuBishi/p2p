
import { getTeam } from '../middleware/getTeam.mock.js';
import { setTitle } from '../ui/layouts/app.jsx';

export const REQUEST_TEAM = '/team/REQUEST_TEAM';
export const RECEIVE_TEAM = '/team/RECEIVE_TEAM';
export const INVALIDATE_PROJECT = '/team/INVALIDATE_PROJECT';
export const SELECT_MEMBER = '/team/SELECT_MEMBER';

export const selectMember = (member, props, dispatch) => {
  dispatch(setTitle('Evaluation'));
  props.router.push(`/team/evaluation`);
  return {
    type: SELECT_MEMBER,
    member,
  };
};

export const invalidateProject = (project) => ({
  type: INVALIDATE_PROJECT,
  project,
});

const requestTeam = project => ({
  type: REQUEST_TEAM,
  project,
});

const receiveTeam = (project, data) => ({
  type: RECEIVE_TEAM,
  project,
  members: data.members,
});

const fetchTeam = project => dispatch => {
  dispatch(requestTeam(project));
  getTeam(project, (data) => {
    dispatch(receiveTeam(project, data));
  });
};

const shouldFetchTeam = state => {
  if (!state.team) {
    return true;
  }
  return !state.team.isFetching;
};

export const fetchTeamIfNeeded = project => (dispatch, state) => {
  if (shouldFetchTeam(state)) {
    return dispatch(fetchTeam(project));
  }
};
