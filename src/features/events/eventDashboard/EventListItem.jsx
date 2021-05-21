import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, List, Segment } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';
import { format } from 'date-fns';
import { deleteEventInFirestore } from '../../../app/firestore/firestoreService';

const EventListItem = ({ event }) => {
  const {
    title,
    date,
    // category,
    description,
    city,
    venue,
    hostedBy,
    hostPhotoURL,
    attendees,
    isCancelled,
  } = event;

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src={hostPhotoURL} />
            <Item.Content>
              <Item.Header content={title} />
              <Item.Description>
                Hosted by <Link to={`/profile/${event.hostUid}`}>{hostedBy}</Link>
              </Item.Description>
              {isCancelled && (
                <Label
                  style={{ top: '-40px' }}
                  ribbon="right"
                  color="red"
                  content="This event has been cancelled"
                />
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {format(date, 'MMMM d, yyyy h:mm a')}
          <Icon name="marker" /> {venue.address} {city.address}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {attendees.map((attendee) => (
            <EventListAttendee key={attendee.id} attendee={attendee} />
          ))}
        </List>
      </Segment>
      <Segment clearing>
        <div>{description}</div>
        <Button
          onClick={() => deleteEventInFirestore(event.id)}
          color="red"
          floated="right"
          content="Delete"
        />
        <Button
          as={Link}
          to={`/events/${event.id}`}
          color="teal"
          floated="right"
          content="View"
        />
      </Segment>
    </Segment.Group>
  );
};

export default EventListItem;
