import React from 'react';
import { Segment, Item } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ScreamDetailedHeader = ({ scream }) => {
  return (
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
  );
};

export default ScreamDetailedHeader;
