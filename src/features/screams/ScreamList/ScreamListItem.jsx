import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Segment, Item, Button, Popup, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ScreamCarousel from './ScreamCarousel';
import ScreamLike from '../ScreamLike/ScreamLike';

const mapState = (state) => ({
  auth: state.firebase.auth,
});

class ScreamListItem extends Component {
  render() {
    const {
      scream,
      likes,
      auth,
      // deleteScream
    } = this.props;
    const isHost = scream.hostUid === auth.uid;

    // console.log('likes', likes);
    // console.log('scream', scream);
    // console.log('host', isHost);
    // console.log('auth', auth);

    // let likeCount = likes.length;
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size='tiny' circular src={scream.hostPhotoURL} />
              <Item.Content>
                <Item.Header as={Link} to={`/screams/${scream.id}`}>
                  {scream.hostedBy}
                </Item.Header>
                <Item.Description>{scream.date}</Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment style={{ padding: 0 }} as={Link} to={`/screams/${scream.id}`}>
          <Item>
            <ScreamCarousel scream={scream} />
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
          {/* <Popup
            content='Delete'
            trigger={
              <Button
                floated='right'
                icon
                onClick={() => deleteScream(scream.id)}
                as='a'
                color='red'
              >
                <Icon name='trash' />
              </Button>
            }
          /> */}

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
