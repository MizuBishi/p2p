// React imports
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

// Material Design Theme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import App from './app.jsx';
import Dashboard from '../../containers/Dashboard.jsx';
import CriteriaOverview from '../../containers/CriteriaOverview.jsx';
import TeamOverview from '../../containers/TeamOverview.jsx';
import MyRatingOverview from '../../containers/MyRatingOverview.jsx';
import TeamRatingOverview from '../../containers/TeamRatingOverview.jsx';
import EvaluationContainer from '../../containers/EvaluationContainer.jsx';
import ProjectContainer from '../../containers/ProjectContainer.jsx';


export default (store) => {
  const history = syncHistoryWithStore(browserHistory, store);
  return (
    <MuiThemeProvider>
      <Provider store={store} >
        <Router history={history} >
          <Route path="/">
            <IndexRoute>
              <Redirect from="/" to="ip-p2p" />
            </IndexRoute>
            <Route path="ip-p2p" component={App} >
              {/* General routes */}
              <IndexRoute component={Dashboard} />

              {/* TM & QM Rating routes */}
              <Route path="team/rating" component={TeamRatingOverview} />
              <Route path="team/rating/:slug" component={EvaluationContainer} />
              <Route path="myrating" component={MyRatingOverview} />

              {/* QM edit routes */}
              <Route path="criteria/edit" component={CriteriaOverview} />
              <Route path="team/edit" component={TeamOverview} />

              {/* FCoach routes*/}
              <Route path="projects/:slug" component={ProjectContainer} />

              {/* Test Routes */}
              <Route path="/:test" component={TeamRatingOverview} />
            </Route>
          </Route>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
};
