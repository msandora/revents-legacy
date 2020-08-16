import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Segment, Item, Button, Popup, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ScreamDetailsCarousel from './../ScreamDetails/ScreamDetailsCarousel';
import ScreamLike from '../ScreamLike/ScreamLike';
import ScreamDetailsDialog from '../ScreamDetails/ScreamDetailsDialog';
import ScreamDetailsHeader from '../ScreamDetails/ScreamDetailsHeader';
import ScreamModal from '../../modals/ScreamModal';

const mapState = (state) => ({
  auth: state.firebase.auth,
});

class ScreamListItem extends Component {
  render() {
    const { scream, auth } = this.props;
    const isHost = scream.hostUid === auth.uid;

    return (
      <Segment.Group>
        <Segment>
          <ScreamDetailsHeader scream={scream} />
        </Segment>
        <Segment style={{ padding: 0 }}>
          <Item>
            <ScreamDetailsCarousel scream={scream} />
          </Item>
        </Segment>
        <Segment>
          <span style={{ whiteSpace: 'pre-wrap' }}>{scream.body}</span>
        </Segment>
        <Segment attached clearing>
          <ScreamLike screamId={scream.id} />
          <Popup
            content='Comments'
            trigger={
              <Button
                labelPosition='right'
                as={Link}
                to={`/screams/${scream.id}`}
              >
                <Button icon>
                  <Icon name='comments outline' />
                </Button>
                <Label as='div' basic pointing='left'>
                  5
                </Label>
              </Button>
            }
          />
          <ScreamModal scream={scream} />
          <ScreamDetailsDialog scream={scream} />
          {isHost && (
            <Popup
              content='Manage'
              trigger={
                <Button
                  floated='right'
                  icon
                  as={Link}
                  to={`/manageScream/${scream.id}`}
                >
                  <Icon name='edit' />
                </Button>
              }
            />
          )}
        </Segment>
      </Segment.Group>
    );
  }
}

export default withFirebase(connect(mapState, null)(ScreamListItem));
