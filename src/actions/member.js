// Middleware
import { updateTeamMember as apiUpdateTeamMember } from '../middleware/updateTeamMember.mock.js';

// Actions
import { setTitle } from './app.js';
import { updateTeamMember, resetTeamMembers } from './team.js';

// Utils
import getCriteriaValues from './utils/getCriteriaValues.js';

export const INITIALIZE = '/member/INITIALIZE';
export const SELECT_MEMBER = '/member/SELECT_MEMBER';
export const UPDATE_COMMENT = '/member/UPDATE_COMMENT';
export const UPDATE_RATING = '/member/UPDATE_RATING';
export const ERROR_RESET_UPDATE = '/member/ERROR_RESET_UPDATE';


export const resetPreviousMember = value => ({
  type: ERROR_RESET_UPDATE,
  member: value,
});

const showSelectedMember = (index, props) => ({
  type: SELECT_MEMBER,
  onClosePath: props.onClosePath,
  index,
  readonly: props.readonly || props.isQM,
  title: props.title,
});

const saveMember = (props, index, close) => (dispatch) => {
  if (props.memberUpdated && props.values) {
    const member = props.members[props.selectedIndex];

    if (props.values.ratings) {
      member.categories = getCriteriaValues(member, props.values);
    }
    member.comment = props.values.comment || member.comment;

    dispatch(updateTeamMember(member));

    apiUpdateTeamMember(member, (err, res) => {
      if (err) {
        dispatch(resetPreviousMember(props.member));
        dispatch(resetTeamMembers(props.member));
      }
    });
  }

  if (close) {
    props.router.push(props.onClosePath);
  } else {
    dispatch(showSelectedMember(index, props));
    props.router.push(`/team/rating/${props.members[index].slug}`);
  }
};

export const selectMember = (index, props) => (dispatch) => {
  dispatch(saveMember(props, index));
  dispatch(setTitle(`${props.title} ${props.members[index].name}`));
};

export const showMember = (member, props) => (dispatch) => {
  const index = props.members ? props.members.indexOf(member) : -1;
  if (index > -1) {
    dispatch(setTitle(`${props.title} ${props.members[index].name}`));
    dispatch(showSelectedMember(index, props));
    props.router.push(`/team/rating/${props.members[index].slug}`);
  } else {
    console.log('Member not found');
  }
};

export const saveMemberAndClose = props => (dispatch) => {
  dispatch(saveMember(props, 0, true));
};

export const updateComment = value => ({
  type: UPDATE_COMMENT,
  comment: value,
});

export const updateRating = (value, id) => ({
  type: UPDATE_RATING,
  id,
  rating: value,
});

export const initialize = index => ({
  type: INITIALIZE,
  initialIndex: index,
});