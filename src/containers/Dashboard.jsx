// React imports
import React from 'react';
import { connect } from 'react-redux';

// Component imports
import Inbox from './Inbox.jsx';
import ProjectOverview from './ProjectOverview.jsx';
import TeamRatingOverview from './TeamRatingOverview.jsx';


const Dashboard = props => (
  <div>
    <Inbox />
    {(props.isJury ?
      <ProjectOverview /> :
      <TeamRatingOverview />)
    }
  </div>
);

Dashboard.propTypes = {
  isJury: React.PropTypes.bool,
};

const mapStateToProps = (globalState, props) => {
  const { user } = globalState.app;

  return {
    isJury: user && user.isJury,
    ...props,
  };
};


const DashboardComponent = connect(
  mapStateToProps
)(Dashboard);

export default DashboardComponent;
