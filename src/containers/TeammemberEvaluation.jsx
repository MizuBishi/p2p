// React imports
import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Component imports
import TabHeader from '../ui/components/TabHeader.jsx';

// Page imports
import EvaluationPage from '../ui/pages/EvaluationPage.jsx';

// Action imports
import {
  selectMember,
  updateComment,
  updateRating,
  saveMemberAndClose,
} from '../actions/member.js';


const EvaluationContainer = props => (
  <div>
    <TabHeader
      members={props.members}
      selectedIndex={props.selectedIndex}
      onChange={index => props.handleSelectMember(index, props)}
    />
    <EvaluationPage
      {...props.selectedMember}
      categories={props.categories}
      readonly={props.readonly}
      onCommentChanged={props.handleCommentChanged}
      onRatingChanged={props.handleRatingChanged}
      onClose={props.handleClose}
      {...props}
    />
  </div>
);

EvaluationContainer.propTypes = {
  handleSelectMember: React.PropTypes.func,
  handleCommentChanged: React.PropTypes.func,
  handleRatingChanged: React.PropTypes.func,
  handleClose: React.PropTypes.func,
  categories: React.PropTypes.array.isRequired,
  members: React.PropTypes.array.isRequired,
  selectedIndex: React.PropTypes.number,
  selectedMember: React.PropTypes.object,
  readonly: React.PropTypes.bool,
};

const mapStateToProps = (globalState, props) => {
  const { members } = globalState.team;
  const { values, selectedIndex, ...other } = globalState.member;
  const selectedMember = members[selectedIndex];
  selectedMember.rating = other.testParam === 'final' ? 3 : selectedMember.rating;

  const categories = selectedMember.categories.map(category => ({
    ...category,
    criterias: category.criterias.map((criteria) => {
      const newRating = values.ratings.find(r => r.id === criteria.id);
      const rating = newRating ? { ...newRating, label: criteria.label } : criteria;
      return rating;
    }),
  }));

  return {
    ...other,
    ...props,
    members,
    selectedIndex,
    selectedMember,
    categories,
    values,
  };
};

const mapDispatchToProps = dispatch => ({
  handleSelectMember: (index, props) => dispatch(selectMember(index, props)),
  handleCommentChanged: value => dispatch(updateComment(value)),
  handleRatingChanged: (nextValue, prevValue, id) => dispatch(updateRating(nextValue, id)),
  handleClose: props => dispatch(saveMemberAndClose(props)),
});

const TeammemberEvaluation = connect(
  mapStateToProps,
  mapDispatchToProps
)(EvaluationContainer);

export default withRouter(TeammemberEvaluation);
