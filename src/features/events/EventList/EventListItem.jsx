import React, { Component } from 'react';
import {
  Segment,
  Icon,
  List,
  Button,
  Label,
  Header,
  Image,
} from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { objectToArray } from '../../../app/common/util/helpers';

class EventListItem extends Component {
  render() {
    const { event } = this.props;
    // console.log(event);

    return (
      <Segment.Group>
        <Segment>
          <Header as='h5'>
            <Image
              circular
              src={event.hostPhotoURL}
              as={Link}
              to={`/events/${event.id}`}
            />
            <Header.Content>
              {event.title}
              <Header.Subheader>
                Hosted by
                <Link as={Link} to={`/profile/${event.hostUid}`}>
                  {' '}
                  {event.hostedBy}
                </Link>
              </Header.Subheader>
            </Header.Content>
          </Header>
          {event.cancelled && (
            <Label
              style={{ top: '-40px' }}
              ribbon='right'
              color='red'
              content='This event has been cancelled'
            />
          )}
        </Segment>
        <Segment>
          <span>
            <Icon name='clock' /> {format(event.date.toDate(), 'EEEE do LLL')}{' '}
            at {format(event.date.toDate(), 'h:mm a')} |
            <Icon name='marker' /> {event.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {event.attendees &&
              objectToArray(event.attendees).map((attendee) => (
                <EventListAttendee key={attendee.id} attendee={attendee} />
              ))}
          </List>
        </Segment>
        <Segment>
          <span style={{ whiteSpace: 'pre-wrap' }}>{event.description}</span>
        </Segment>
        <Segment clearing>
          {/* Arrow function allows me to not immediatly execute event */}
          <Button
            // onClick={() => deleteEvent(event.id)}
            onClick={() => console.log('fix this', event.id)}
            as='a'
            color='red'
            floated='right'
            content='Delete'
          />
          <Button
            as={Link}
            to={`/events/${event.id}`}
            color='teal'
            floated='right'
            content='View'
          />
        </Segment>
      </Segment.Group>
    );
  }
}

export default EventListItem;
