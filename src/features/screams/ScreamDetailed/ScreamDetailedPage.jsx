import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, SegmentGroup } from 'semantic-ui-react';
import ScreamDetailedHeader from './ScreamDetailedHeader';
import ScreamDetailedInfo from './ScreamDetailedInfo';
import ScreamDetailedChat from './ScreamDetailedChat';
import {
  withFirestore,
  //firebaseConnect, isEmpty
} from 'react-redux-firebase';

const mapState = (state, ownProps) => {
  const screamId = ownProps.match.params.id;
  //Declare as empty object
  let scream = {};

  if (
    state.firestore.ordered.screams &&
    state.firestore.ordered.screams.length > 0
  ) {
    scream =
      state.firestore.ordered.screams.filter(
        (scream) => scream.id === screamId
      )[0] || {};
  }

  return {
    scream,
    // requesting: state.firestore.status.requesting,
    // loading: state.async.loading,
    auth: state.firebase.auth,
    // screamChat:
    //   !isEmpty(state.firebase.data.scream_chat) && // If Chat is not empty
    //   objectToArray(state.firebase.data.scream_chat[ownProps.match.params.id]),
  };
};
class ScreamDetailedPage extends Component {
  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`screams/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`screams/${match.params.id}`);
  }

  render() {
    const { scream, auth } = this.props;
    const isHost = scream.hostUid === auth.uid;
    return (
      <Grid>
        <Grid.Column width={10}>
          <SegmentGroup>
            <ScreamDetailedHeader scream={scream} isHost={isHost} />
            <ScreamDetailedInfo scream={scream} />
          </SegmentGroup>
        </Grid.Column>
        <Grid.Column width={6}>
          <ScreamDetailedChat scream={scream} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default withFirestore(connect(mapState)(ScreamDetailedPage));
