// React imports
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Component imports
import Inbox from './Inbox.jsx';
import ProjectOverview from './ProjectOverview.jsx';
import TeamRatingOverview from './TeamRatingOverview.jsx';


const Dashboard = props => (
  <div>
    {(props.user ?
      <div>
        <Inbox />
        {(props.user.isCoach ?
          <ProjectOverview /> :
          <TeamRatingOverview isQMRating={props.isQMRating} />
        )}
      </div> : undefined
    )}
  </div>
);

Dashboard.propTypes = {
  user: React.PropTypes.object,
  isQMRating: React.PropTypes.bool,
};

const mapStateToProps = (globalState, props) => {
  const { user } = globalState.app;

  return {
    user,
    isQMRating: props.location.pathname !== '/ip-p2p/team/rating',
  };
};


const DashboardComponent = connect(
  mapStateToProps
)(Dashboard);

export default withRouter(DashboardComponent);
