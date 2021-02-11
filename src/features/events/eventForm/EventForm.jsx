import React, { useState } from 'react';
import { Button, Header, Segment, FormField, Label } from 'semantic-ui-react';
import cuid from 'cuid';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent, updateEvent } from '../eventActions';
import * as Yup from 'yup';

const EventForm = ({ match, history }) => {
  const dispatch = useDispatch();
  const selectedEvent = useSelector((state) =>
    state.event.events.find((evt) => evt.id == match.params.id)
  );

  const initialValues = selectedEvent ?? {
    title: '',
    category: '',
    description: '',
    city: '',
    venue: '',
    date: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('You must provide a title'),
  });
  // const [values, setValues] = useState(initialValues);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setValues({ ...values, [name]: value });
  // };

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   selectedEvent
  //     ? dispatch(updateEvent({ ...selectedEvent, ...values }))
  //     : dispatch(
  //         createEvent({
  //           ...values,
  //           id: cuid(),
  //           hostedBy: 'Bob',
  //           attendees: [
  //             {
  //               id: cuid(),
  //               photoURL: '/assets/user.png',
  //               name: 'moli',
  //             },
  //           ],
  //           hostPhotoURL: '/assets/user.png',
  //         })
  //       );
  //   history.push('/events');
  // };

  return (
    <Segment clearing>
      <Header content={!selectedEvent ? 'Create new event' : 'Edit the event'} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}>
        <Form className="ui form">
          <FormField>
            <Field name="title" placeholder="Event title" />
            <ErrorMessage
              name="title"
              render={(error) => (
                <Label basic color="red">
                  {error}
                </Label>
              )}
            />
          </FormField>
          <FormField>
            <Field name="category" placeholder="Category" />
          </FormField>
          <FormField>
            <Field name="description" placeholder="Description" />
          </FormField>
          <FormField>
            <Field name="city" placeholder="City" />
          </FormField>
          <FormField>
            <Field name="venue" placeholder="Venue" />
          </FormField>
          <FormField>
            <Field type="date" name="date" placeholder="Event date" />
          </FormField>

          <Button type="submit" floated="right" positive content="Submit" />
          <Button as={Link} to="/events" type="button" floated="right" content="Cancel" />
        </Form>
      </Formik>
    </Segment>
  );
};

export default EventForm;
