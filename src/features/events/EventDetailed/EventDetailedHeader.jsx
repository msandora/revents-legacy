import React, { Fragment } from 'react';
import { Segment, Image, Item, Header, Button, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import {
  imageStyle,
  imageTextStyle,
} from '../../../app/common/styles/DetailedHeader';

const EventDetailedHeader = ({
  event,
  isHost,
  isGoing,
  goingToEvent,
  cancelGoingToEvent,
  loading,
  authenticated,
  openModal,
}) => {
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image
          src={`/assets/categoryImages/${event.category}.jpg`}
          fluid
          style={imageStyle}
        />

        <Segment basic style={imageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={event.title}
                  style={{ color: 'white' }}
                />
                <p>
                  {event.date && format(event.date.toDate(), 'EEEE do LLLL')}
                </p>
                <p>
                  Hosted by{' '}
                  <strong>
                    <Link
                      to={`/profile/${event.hostUid}`}
                      style={{ color: 'white' }}
                    >
                      {event.hostedBy}
                    </Link>
                  </strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached='bottom' clearing>
        {event.cancelled && (
          <Label
            size='large'
            color='red'
            content='This event has been cancelled'
          />
        )}
        {!isHost && (
          <Fragment>
            {isGoing && !event.cancelled && (
              <Button onClick={() => cancelGoingToEvent(event)}>
                Cancel My Place
              </Button>
            )}
            {!isGoing && authenticated && !event.cancelled && (
              <Button
                onClick={() => goingToEvent(event)}
                loading={loading}
                color='teal'
              >
                JOIN THIS EVENT
              </Button>
            )}
            {!authenticated && !event.cancelled && (
              <Button
                onClick={() => openModal('UnauthModal')}
                loading={loading}
                color='teal'
              >
                JOIN THIS EVENT
              </Button>
            )}
          </Fragment>
        )}

        {isHost && (
          <Button
            as={Link}
            to={`/manageEvent/${event.id}`}
            color='orange'
            floated='right'
          >
            Manage Event
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default EventDetailedHeader;
