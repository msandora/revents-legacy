import React, { Component } from 'react';
import { Segment, Item, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class ScreamListItem extends Component {
  render() {
    const { scream, selectScream, deleteScream } = this.props;
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
        <Segment>
          <span style={{ whiteSpace: 'pre-wrap' }}>{scream.body}</span>
        </Segment>
        <Segment clearing>
          <Button
            onClick={() => deleteScream(scream.id)}
            as='a'
            color='red'
            floated='right'
            content='Delete'
          />
          <Button
            onClick={() => selectScream(scream)}
            as={Link}
            to={`/screams/${scream.id}`}
            color='teal'
            floated='right'
            content='View'
          />
        </Segment>
      </Segment.Group>
    );
  }
}

export default ScreamListItem;
