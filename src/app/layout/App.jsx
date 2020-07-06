import React, { Component, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { Route, Switch, withRouter } from 'react-router-dom';
import NavBar from '../../features/nav/NavBar/NavBar';
import HomePage from '../../features/home/HomePage';
import EventDashboard from '../../features/events/EventDashboard/EventDashboard';
import EventDetailedPage from '../../features/events/EventDetailed/EventDetailedPage';
import EventForm from '../../features/events/EventForm/EventForm';
import ScreamDashboard from '../../features/screams/ScreamDashboard/ScreamDashboard';
import ScreamForm from '../../features/screams/ScreamForm/ScreamForm';
import RecipeDashboard from '../../features/recipes/RecipeDashboard/RecipeDashboard';
import FamilyDashboard from '../../features/family/FamilyDashboard/FamilyDashboard';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import TestComponent from '../../features/playground/TestComponent';
import ModalManager from '../../features/modals/ModalManager';
import { UserIsAuthenticated } from '../../features/auth/AuthWrapper';
import NotFound from './NotFound';

class App extends Component {
  render() {
    return (
      <Fragment>
        <ModalManager />
        <Route exact path='/' component={HomePage} />
        <Route
          path='/(.+)'
          render={() => (
            <Fragment>
              <NavBar />
              <Container className='main'>
                <Switch key={this.props.location.key}>
                  <Route exact path='/events' component={EventDashboard} />
                  <Route path='/events/:id' component={EventDetailedPage} />
                  <Route
                    path={['/createEvent', '/manageEvent/:id']}
                    component={UserIsAuthenticated(EventForm)}
                  />
                  <Route path='/screams' component={ScreamDashboard} />
                  <Route path='/screams/:id' component={ScreamDashboard} />
                  <Route
                    path={['/createScream', '/manageScream/:id']}
                    component={UserIsAuthenticated(ScreamForm)}
                  />
                  <Route path='/recipes' component={RecipeDashboard} />
                  <Route path='/family-tree' component={FamilyDashboard} />
                  <Route path='/profile/:id' component={UserIsAuthenticated(UserDetailedPage)} />
                  <Route path='/settings' component={UserIsAuthenticated(SettingsDashboard)} />
                  <Route path='/test' component={TestComponent} />
                  <Route component={NotFound} />
                </Switch>
              </Container>
            </Fragment>
          )}
        />
      </Fragment>
    );
  }
}

export default withRouter(App);
