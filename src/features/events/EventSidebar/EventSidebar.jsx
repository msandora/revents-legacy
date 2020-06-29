import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Button, Segment, Sticky } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import EventActivity from '../EventActivity/EventActivity';

const mapState = (state) => ({
  auth: state.firebase.auth,
});

class EventSidebar extends Component {
  render() {
    const { auth, contextRef, activities } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    return (
      <Sticky context={contextRef} offset={78} styleElement={{ zIndex: 0 }}>
        {authenticated && (
          <Segment clearing>
            <Button
              as={Link}
              to='/createEvent'
              fluid
              positive
              content='Create Event'
            />
          </Segment>
        )}
        <EventActivity activities={activities} />
      </Sticky>
    );
  }
}

export default withRouter(withFirebase(connect(mapState, null)(EventSidebar)));
