// Middleware
import { default as apiGetTeam } from '../middleware/team/getTeam.js';
import { default as apiSaveTeam } from '../middleware/team/saveTeam.js';


export const ADD_MEMBER = '/team/ADD_MEMBER';
export const RECEIVE_TEAM = '/team/RECEIVE_TEAM';
export const REMOVE_MEMBER = '/team/REMOVE_MEMBER';
export const REQUEST_TEAM = '/team/REQUEST_TEAM';
export const UPDATE_TEAM = '/team/UPDATE_TEAM';
export const SAVE_TEAM = '/team/SAVE_TEAM';
export const SHOW_MEMBER_RATING = '/team/SHOW_MEMBER_RATING';


const receiveData = (data) => ({
  type: RECEIVE_TEAM,
  members: data,
});

const shouldFetchData = (state) => {
  if (!state.team || state.relaod) {
    return true;
  }
  return !state.team.isFetching && !state.team.fetched;
};

export const fetchTeam = () => (dispatch, getState) => {
  if (shouldFetchData(getState())) {
    dispatch({ type: REQUEST_TEAM });
    apiGetTeam(data => dispatch(receiveData(data)));
  }
};


export const showMemberRating = (member, props) => (dispatch) => {
  dispatch({
    type: SHOW_MEMBER_RATING,
    member,
  });

  props.router.push(`/ip-p2p/team/member/rating/${member.slug}`);
};

export const updateRoleOfMember = (value, updateMember) => (dispatch, getState) => {
  const state = getState().team;
  const roleState = getState().role;

  if (updateMember && value.roleId) {

    const updatedMember = state.members.find(member => member.studentId === updateMember.studentId);
    const updatedRoles = updatedMember.roles.map(role => ({
      ...role,
      active: false,
    }));
    updatedRoles.push({
      ...roleState.roles.find(role => role.roleId === value.roleId),
      active: true,
    });
    updatedMember.roles = updatedRoles;

    dispatch({
      type: UPDATE_TEAM,
      members: state.members.map(member =>
        (member.studentId === updateMember.studentId ? {
          ...updatedMember,
          updated: true,
        } : member)),
    });
  }
};

export const addMember = (student) => (dispatch, getState) => {
  const state = getState().team;

  const members = state.members;

  if (members) {
    members.push({
      studentId: student.id,
      name: student.name,
      email: student.email,
      slug: student.slug,
      roles: [],
      added: true,
    });

    dispatch({
      type: ADD_MEMBER,
      members,
    })
  }
};

export const removeMember = removedMember => (dispatch, getState) => {
  const state = getState().team;

  const members = (state.members || [])
    .map(member => ({
      ...member,
      removed: member.removed || member.studentId === removedMember.studentId,
    }));

  dispatch({
    type: REMOVE_MEMBER,
    members,
  });
};

export const updateMemberRating = updatedMember => (dispatch, getState) => {
  const state = getState().team;
  const members = state.members.map(member =>
      (member.studentId === updatedMember.studentId ? {
        ...member,
        ratings: updatedMember.ratings,
      } : member));

  dispatch({
    type: UPDATE_TEAM,
    members,
  });
};


export const saveTeam = props => (dispatch, getState) => {
  const state = getState().team;

  if (state.members) {
    apiSaveTeam(state.members, (data) => {
      if (data.status === 500) {
        // TODO: i18n
        // TODO: Error handling
        alert('Criteria could not be saved');
      } else {
        apiGetTeam(data => dispatch(receiveData(data)));
      }
    });

    dispatch({
      type: SAVE_TEAM,
      members: state.members,
    });
  }

  props.router.push('/ip-p2p');
};

export const cancel = props => (dispatch) => {
  dispatch({ type: REQUEST_TEAM });
  apiGetTeam(data => dispatch(receiveData(data)));

  props.router.push('/ip-p2p');
};


