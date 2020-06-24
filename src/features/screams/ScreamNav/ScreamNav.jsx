import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Button, Segment } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

const mapState = (state) => ({
  auth: state.firebase.auth,
});

class ScreamNav extends Component {
  render() {
    const { auth } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    return (
      <Fragment>
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
      </Fragment>
    );
  }
}

export default withRouter(withFirebase(connect(mapState, null)(ScreamNav)));
