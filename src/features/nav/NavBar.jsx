import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';
import SignedInMenu from './SignedInMenu';
import SignedOutMenu from './SignedOutMenu';

const NavBar = ({ setFormOpen }) => {
  const [authenticated, setAuthenticated] = useState(false);
  return (
    <Menu fixed="top">
      <Container>
        <Menu.Item as={NavLink} exact to="/" header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: '15px' }} />
          Re-Vents
        </Menu.Item>
        <Menu.Item as={NavLink} to="/events" name="Event" />
        {authenticated && (
          <Menu.Item as={NavLink} to="/createEvent">
            <Button onClick={setFormOpen} positive inverted content="Create Event" />
          </Menu.Item>
        )}
        {authenticated ? (
          <SignedInMenu setAuthenticated={setAuthenticated} />
        ) : (
          <SignedOutMenu setAuthenticated={setAuthenticated} />
        )}
      </Container>
    </Menu>
  );
};

export default NavBar;
