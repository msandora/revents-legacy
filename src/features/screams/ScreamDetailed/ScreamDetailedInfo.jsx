import React from 'react';
import { Segment, Item, Button, Icon, Label, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ScreamCarousel from './../ScreamList/ScreamCarousel';

const ScreamDetailedInfo = ({ scream }) => {
  return (
    <div>
      <Segment attached>
        <Item.Group>
          <Item>
            <ScreamCarousel scream={scream} />
          </Item>
        </Item.Group>
      </Segment>
      <Segment attached>
        <span style={{ whiteSpace: 'pre-wrap' }}>{scream.body}</span>
      </Segment>
      <Segment attached='bottom' clearing>
        <Button as='div' labelPosition='right'>
          <Button>
            <Icon name='heart' />
            Like
          </Button>
          <Label as='a' basic pointing='left'>
            2,048
          </Label>
        </Button>
        <Popup
          content='Go back'
          trigger={
            <Button
              floated='right'
              icon
              onClick={console.log('GO BACK')}
              type='button'
            >
              <Icon name='cancel' />
            </Button>
          }
        />
        <Popup
          content='Manage'
          trigger={
            <Button
              floated='right'
              icon
              as={Link}
              to={`/manageScream/${scream.id}`}
            >
              <Icon name='options' />
            </Button>
          }
        />
      </Segment>
    </div>
  );
};

export default ScreamDetailedInfo;
