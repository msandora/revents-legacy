import React from 'react';
import { Segment, Item, Popup, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ScreamDetailedHeader = ({ scream, isHost }) => {
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
            {isHost && (
              <Popup
                content='Go back'
                trigger={
                  <Button
                    floated='right'
                    icon
                    color='red'
                    as={Link}
                    to={'/screams'}
                    type='button'
                  >
                    <Icon name='cancel' />
                  </Button>
                }
              />
            )}
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  );
};

export default ScreamDetailedHeader;
