import React from 'react';
import { Segment } from 'semantic-ui-react';
import { TestMap } from '../../sandox/TestMap';

export const EventDetailedMap = ({ eventLocation }) => {
  return (
    <Segment attached="bottom" style={{ padding: 0 }}>
      <div style={{ width: '100%', height: '400px' }}>
        <TestMap locations={eventLocation} />
      </div>
    </Segment>
  );
};
