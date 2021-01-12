import React from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';

const EventForm = () => {
  return (
    <Segment clearing>
      <Header content="Create new event" />
      <Form>
        <Form.Field>
          <input type="text" placeholder="Event title" />
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder="Category" />
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder="Description" />
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder="Venu" />
        </Form.Field>
        <Form.Field>
          <input type="date" placeholder="Date" />
        </Form.Field>
        <Button type="button" floated="right" content="Cancel" />
        <Button type="submit" floated="right" positive content="Submit" />
      </Form>
    </Segment>
  );
};

export default EventForm;
