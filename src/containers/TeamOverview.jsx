// React imports
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Component imports
import EditTeamPage from '../ui/pages/EditTeamPage.jsx';

// Action imports
import { setTitle } from '../actions/app.js';
import {
  addMember,
  removeMember,
  fetchTeam,
  saveTeam,
  updateRoleOfMember,
  cancel,
} from '../actions/team.js';
import {
  fetchRoles,
} from '../actions/roles.js';


class TeamOverviewComponent extends Component {
  componentDidMount() {
    this.props.initializeTitle();
    this.props.fetchTeam();
    this.props.fetchRoles();
  }

  render() {
    return (<EditTeamPage {...this.props} />);
  }
}

TeamOverviewComponent.propTypes = {
  initializeTitle: React.PropTypes.func,
  fetchTeam: React.PropTypes.func,
};

const mapStateToProps = (globalState, props) => {
  const { members, canAdd } = globalState.team;
  const { roles } = globalState.role;

  return {
    ...props,
    title: 'Teammembers',
    members,
    roles,
    canAdd,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  initializeTitle: () => dispatch(setTitle('Teammembers')),
  fetchTeam: () => dispatch(fetchTeam()),
  fetchRoles: () => dispatch(fetchRoles()),
  handleDelete: memberId => dispatch(removeMember(memberId)),
  handleAdd: student => dispatch(addMember(student)),
  handleRoleChanged: (role, memberId) => dispatch(updateRoleOfMember(role, memberId)),
  handleSave: () => dispatch(saveTeam(props)),
  handleCancel: () => dispatch(cancel(props)),
});

const TeamOverview = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamOverviewComponent);

export default withRouter(TeamOverview);
