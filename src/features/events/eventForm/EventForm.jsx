import React, { useState } from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import cuid from 'cuid';

const EventForm = ({ setFormOpen, setEvents, createEvent }) => {
  const initialValues = {
    title: '',
    category: '',
    description: '',
    city: '',
    venue: '',
    date: '',
  };

  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmitForm = () => {
    createEvent({
      ...values,
      id: cuid(),
      attendees: [],
      hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
      hostedBy: 'Bob',
    });
    setFormOpen(false);
  };

  return (
    <Segment clearing>
      <Header content="Create new event" />
      <Form onSubmit={handleSubmitForm}>
        <Form.Field>
          <input
            type="text"
            placeholder="Event title"
            name="title"
            value={values.title}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder="Category"
            name="category"
            value={values.category}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder="City"
            name="city"
            value={values.city}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder="Venue"
            name="venue"
            value={values.venue}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="date"
            placeholder="Date"
            name="date"
            value={values.date}
            onChange={handleInputChange}
          />
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
