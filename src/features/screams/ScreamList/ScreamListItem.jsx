import React, { Component } from 'react';
import { Segment, Item, Button, Popup, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ScreamCarousel from './ScreamCarousel';

class ScreamListItem extends Component {
  render() {
    const {
      scream,
      // deleteScream
    } = this.props;
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
        <Segment style={{ padding: 0 }}>
          <Item>
            <ScreamCarousel scream={scream} />
          </Item>
        </Segment>
        <Segment>
          <span style={{ whiteSpace: 'pre-wrap' }}>{scream.body}</span>
        </Segment>
        <Segment attached clearing>
          <Popup
            content='Like'
            trigger={
              <Button as='div' labelPosition='right'>
                <Button icon>
                  <Icon name='heart' />
                </Button>
                <Label as='div' basic pointing='left'>
                  24
                </Label>
              </Button>
            }
          />
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
        </Segment>
      </Segment.Group>
    );
  }
}

export default ScreamListItem;
