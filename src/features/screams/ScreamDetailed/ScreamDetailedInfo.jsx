import React from 'react';
import { Segment, Item, Button, Icon, Label, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ScreamCarousel from './../ScreamList/ScreamCarousel';
// import MyButton from '../../../app/common/util/MyButton';

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
        <Popup
          content='Go back'
          trigger={
            <Button
              floated='right'
              icon
              onClick={() => alert('Fix this go back button')}
              type='button'
            >
              <Icon name='cancel' />
            </Button>
          }
        />
        {/* <MyButton
          tip='Test MyButton'
          floated='right'
          onClick={() => console.log('ALERT')}
          type='button'
          color='red'
        >
          <Icon name='bell' />
        </MyButton> */}
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
    </div>
  );
};

export default ScreamDetailedInfo;
