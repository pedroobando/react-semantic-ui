import React from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';

const EventForm = ({ setFormOpen }) => {
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
        <Button type="submit" floated="right" positive content="Submit" />
        <Button
          type="button"
          onClick={() => setFormOpen(false)}
          floated="right"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default EventForm;
