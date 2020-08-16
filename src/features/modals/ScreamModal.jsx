import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withFirestore, firebaseConnect, isEmpty } from 'react-redux-firebase';

import { Link, withRouter } from 'react-router-dom';

import { Button, Icon, Modal, Popup, Label, Grid } from 'semantic-ui-react';
import ScreamDetailsHeader from '../screams/ScreamDetails/ScreamDetailsHeader';
import ScreamDetailsInfo from '../screams/ScreamDetails/ScreamDetailsInfo';
import ScreamDetailsCarousel from '../screams/ScreamDetails/ScreamDetailsCarousel';

import { objectToArray, createDataTree } from '../../app/common/util/helpers';
import { addScreamComment } from '../screams/screamActions';
import { closeModal, openModal } from './modalActions';

const mapState = (state, ownProps) => {
  const screamId = ownProps.match.params.id;
  // console.log('state', state);
  // console.log('screamId', screamId);
  let scream = {};

  if (
    state.firestore.ordered.screams &&
    state.firestore.ordered.screams.length > 0
  ) {
    // scream =
    //   state.firestore.ordered.screams.filter(
    //     (scream) => scream.id === screamId
    //   )[0] || {};
  }
  // console.log(scream);

  return {
    scream,
    requesting: state.firestore.status.requesting,
    loading: state.async.loading,
    auth: state.firebase.auth,
    // screamChat:
    //   !isEmpty(state.firebase.data.scream_chat) && // If Chat is not empty
    //   objectToArray(state.firebase.data.scream_chat[ownProps.match.params.id]),
  };
};

const actions = {
  closeModal,
  openModal,
  addScreamComment,
};

class ScreamModal extends Component {
  async componentDidMount() {
    const { firestore, match, scream } = this.props;
    // console.log('getScreamId', scream.id);
    // console.log('firestore', firestore);
    // await firestore.setListener(`screams/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    // await firestore.unsetListener(`screams/${match.params.id}`);
  }
  render() {
    const {
      scream,
      history,
      auth,
      addScreamComment,
      screamChat,
      loading,
      requesting,
      // match,
      openModal,
      closeModal,
    } = this.props;

    const isHost = scream.hostUid === auth.uid;
    const chatTree = !isEmpty(screamChat) && createDataTree(screamChat);
    const authenticated = auth.isLoaded && !auth.isEmpty;
    //const loadingScream = requesting[`screams/${match.params.id}`];

    return (
      <Modal
        centered={false}
        closeIcon
        onClose={() => {
          window.history.pushState({}, document.title, '/' + 'screams');
          closeModal();
        }}
        onOpen={(e) => {
          window.history.pushState(null, null, `screams/123`);
          openModal('ScreamModal', { scream });
        }}
        trigger={<Button color='teal' content='Open ScreamModal' icon />}
        header={<ScreamDetailsHeader scream={scream} />}
        content={
          <Modal.Content>
            <Grid>
              <Grid.Column width={10}>
                <ScreamDetailsCarousel scream={scream} />
              </Grid.Column>
              <Grid.Column width={6}>
                <ScreamDetailsInfo scream={scream} />
              </Grid.Column>
            </Grid>
          </Modal.Content>
        }
        actions={
          <Modal.Actions>
            <Popup
              content='Like'
              trigger={
                <Button as='div' labelPosition='right'>
                  <Button icon>
                    <Icon name='heart' />
                  </Button>
                  <Label as='a' basic pointing='left'>
                    24
                  </Label>
                </Button>
              }
            />
            {isHost && (
              <Popup
                content='Manage'
                trigger={
                  <Button
                    icon
                    as={Link}
                    floated='right'
                    to={`/manageScream/${scream.id}`}
                  >
                    <Icon name='edit' />
                  </Button>
                }
              />
            )}
          </Modal.Actions>
        }
      />
    );
  }
}

// export default connect(mapState, actions)(ScreamModal);
export default withRouter(
  compose(
    withFirestore,
    connect(mapState, actions)
    //firebaseConnect((props) => [`scream_chat/${props.match.params.id}`])
  )(ScreamModal)
);
