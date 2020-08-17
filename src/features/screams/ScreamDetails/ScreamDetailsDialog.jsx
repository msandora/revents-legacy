import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Icon,
  Modal,
  Popup,
  Label,
  Grid,
  Segment,
} from 'semantic-ui-react';
import ScreamDetailsHeader from './ScreamDetailsHeader';
import ScreamDetailsInfo from './ScreamDetailsInfo';
import ScreamDetailsCarousel from './ScreamDetailsCarousel';
import { Link, withRouter } from 'react-router-dom';
import { addScreamComment } from '../screamActions';

const actions = {
  addScreamComment,
};

class ScreamDetailsDialog extends Component {
  state = {
    oldPath: '',
    newPath: '',
  };
  // componentDidMount() {
  //   const { match } = this.props;
  //   console.log('match', match);
  //   // await firestore.setListener(`screams/${match.params.id}`);
  // }
  render() {
    const { scream, isHost } = this.props;
    // console.log('???', this.state);
    return (
      <Modal
        closeIcon
        onClose={() => {
          // console.log('onClose');
          window.history.pushState(null, null, this.state.oldPath);
        }}
        onOpen={() => {
          // console.log('onOpen');
          const { scream, match } = this.props;

          let screamId = scream.id;
          let oldPath = window.location.pathname;
          let userId = this.props.match.params.userId;

          console.log(userId, 'scream', screamId);
          // console.log('scream', scream.hostedBy);

          const newPath = `/screams/${scream.id}`;

          if (oldPath === newPath) oldPath = `/`;

          window.history.pushState(null, null, newPath);

          this.setState({ oldPath, newPath });
        }}
        trigger={<Button color='teal' content='ScreamDetailsModal' icon />}
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
          <Segment>
            <Popup
              content='Like'
              trigger={
                <Button as='div' labelPosition='right'>
                  <Button icon>
                    <Icon name='heart' />
                  </Button>
                  <Label as='a' basic pointing='left'>
                    {scream.likeCount}
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
          </Segment>
        }
      />
    );
  }
}

export default withRouter(connect(null, actions)(ScreamDetailsDialog));
