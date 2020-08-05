import React from 'react';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';

const screamImageStyle = {
  filter: 'brightness(30%)',
};

const screamImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '2%',
  width: '100%',
  height: 'auto',
  color: 'white',
};

const ScreamDetailedHeader = ({ scream }) => {
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image
          src={`/assets/categoryImages/${scream.category}.jpg`}
          fluid
          style={screamImageStyle}
        />

        <Segment basic style={screamImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={scream.title}
                  style={{ color: 'white' }}
                />
                <p>{scream.date}</p>
                <p>
                  Hosted by <strong>{scream.hostedBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached='bottom'>
        <Button>Cancel My Place</Button>
        <Button color='teal'>JOIN THIS EVENT</Button>

        <Button color='orange' floated='right'>
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  );
};

export default ScreamDetailedHeader;
