import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Button, Segment, Sticky } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

const mapState = (state) => ({
  auth: state.firebase.auth,
});

class ScreamNav extends Component {
  render() {
    const { auth, contextRef } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    return (
      <Sticky context={contextRef} offset={78} styleElement={{ zIndex: 0 }}>
        {authenticated && (
          <Segment clearing>
            <Button
              as={Link}
              to='/createScream'
              fluid
              positive
              content='Create Post'
            />
          </Segment>
        )}
      </Sticky>
    );
  }
}

export default withRouter(withFirebase(connect(mapState, null)(ScreamNav)));
