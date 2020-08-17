import React, { Component, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { Route, Switch, withRouter } from 'react-router-dom';
import NavBar from '../../features/nav/NavBar/NavBar';
import HomePage from '../../features/home/HomePage';
import EventDashboard from '../../features/events/EventDashboard/EventDashboard';
import EventDetailedPage from '../../features/events/EventDetailed/EventDetailedPage';
import EventForm from '../../features/events/EventForm/EventForm';
import ScreamDashboard from '../../features/screams/ScreamDashboard/ScreamDashboard';
import ScreamDetailedPage from '../../features/screams/ScreamDetailed/ScreamDetailedPage';

import ScreamForm from '../../features/screams/ScreamForm/ScreamForm';
import RecipesDetailedPage from '../../features/recipes/RecipesDetailed/RecipesDetailedPage';
import RecipesDashboard from '../../features/recipes/RecipesDashboard/RecipesDashboard';
import RecipesForm from '../../features/recipes/RecipesForm/RecipesForm';
import FamilyDashboard from '../../features/family/FamilyDashboard/FamilyDashboard';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import TestComponent from '../../features/playground/TestComponent';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';

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
                  <Route exact path='/screams' component={ScreamDashboard} />
                  <Route
                    path='/screams/details/:id'
                    component={ScreamDetailedPage}
                  />
                  <Route
                    path={['/createScream', '/manageScream/:id']}
                    component={UserIsAuthenticated(ScreamForm)}
                  />
                  <Route exact path='/recipes' component={RecipesDashboard} />
                  <Route path='/recipes/:id' component={RecipesDetailedPage} />
                  <Route
                    path={['/createRecipe', '/manageRecipe/:id']}
                    component={UserIsAuthenticated(RecipesForm)}
                  />
                  <Route path='/family-tree' component={FamilyDashboard} />
                  <Route
                    path='/profile/:id'
                    component={UserIsAuthenticated(UserDetailedPage)}
                  />
                  <Route
                    path='/settings'
                    component={UserIsAuthenticated(SettingsDashboard)}
                  />
                  <Route
                    path='/people'
                    component={UserIsAuthenticated(PeopleDashboard)}
                  />
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
