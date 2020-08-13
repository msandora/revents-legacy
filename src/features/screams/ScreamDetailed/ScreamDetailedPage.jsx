import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import ScreamDetailedHeader from './ScreamDetailedHeader';
import ScreamDetailedInfo from './ScreamDetailedInfo';
import ScreamDetailedChat from './ScreamDetailedChat';
import { withFirestore, firebaseConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import {
  objectToArray,
  createDataTree,
} from '../../../app/common/util/helpers';
import { addScreamComment } from '../screamActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import NotFound from '../../../app/layout/NotFound';

const mapState = (state, ownProps) => {
  const screamId = ownProps.match.params.id;
  // console.log('screamId', screamId);
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
  // console.log(scream);

  return {
    scream,
    requesting: state.firestore.status.requesting,
    loading: state.async.loading,
    auth: state.firebase.auth,
    screamChat:
      !isEmpty(state.firebase.data.scream_chat) && // If Chat is not empty
      objectToArray(state.firebase.data.scream_chat[ownProps.match.params.id]),
  };
};

const actions = {
  addScreamComment,
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
    const {
      scream,
      auth,
      addScreamComment,
      screamChat,
      loading,
      requesting,
      match,
    } = this.props;

    const isHost = scream.hostUid === auth.uid;
    const chatTree = !isEmpty(screamChat) && createDataTree(screamChat);
    const authenticated = auth.isLoaded && !auth.isEmpty;
    const loadingScream = requesting[`screams/${match.params.id}`];

    if (loadingScream) return <LoadingComponent />;
    if (Object.keys(scream).length === 0) return <NotFound />;

    return (
      <Grid>
        <Grid.Column width={10}>
          <ScreamDetailedHeader scream={scream} loading={loading} />
          <ScreamDetailedInfo scream={scream} isHost={isHost} />
        </Grid.Column>
        <Grid.Column width={6}>
          {authenticated && (
            <ScreamDetailedChat
              addScreamComment={addScreamComment}
              screamId={scream.id}
              screamChat={chatTree}
            />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default compose(
  withFirestore,
  connect(mapState, actions),
  firebaseConnect((props) => [`scream_chat/${props.match.params.id}`])
)(ScreamDetailedPage);
