import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import EventDatailedPage from '../../features/events/eventDetailed/EventDatailed';
import EventForm from '../../features/events/eventForm/EventForm';
import HomePage from '../../features/home/HomePage';
import NavBar from '../../features/nav/NavBar';

import './styles.css';

const App = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(undefined);

  const handleSelectEvent = (event) => {
    // console.log(event);
    setSelectedEvent(event);
    setFormOpen(true);
  };

  const handleCreateFormOpen = () => {
    setSelectedEvent(undefined);
    setFormOpen(true);
  };

  return (
    <>
      <NavBar setFormOpen={handleCreateFormOpen} />
      <Container className="main">
        <Route exact path="/" component={HomePage} />
        <Route exact path="/events" component={EventDashboard} />
        <Route path="/events/:id" component={EventDatailedPage} />
        <Route path="/createEvent" component={EventForm} />

        {/* <EventDashboard
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          selectEvent={handleSelectEvent}
          selectedEvent={selectedEvent}
        /> */}
      </Container>
    </>
  );
};

export default App;
