import React, { Component, createRef } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import ScreamDetailedHeader from './ScreamDetailedHeader';
import ScreamDetailedInfo from './ScreamDetailedInfo';
import ScreamDetailedChat from './ScreamDetailedChat';
// import ScreamDetailedSidebar from './ScreamDetailedSidebar';
import { withFirestore, firebaseConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import {
  objectToArray,
  createDataTree,
} from '../../../app/common/util/helpers';
import { addScreamComment } from '../screamActions';
import { openModal } from '../../modals/modalActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import NotFound from '../../../app/layout/NotFound';

const mapState = (state, ownProps) => {
  const screamId = ownProps.match.params.id;

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
  openModal,
};

class ScreamDetailedPage extends Component {
  contextRef = createRef();

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
      openModal,
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
          <div ref={this.contextRef}>
            <ScreamDetailedHeader
              scream={scream}
              isHost={isHost}
              loading={loading}
              authenticated={authenticated}
              openModal={openModal}
            />
            <ScreamDetailedInfo scream={scream} isHost={isHost} />
          </div>
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
