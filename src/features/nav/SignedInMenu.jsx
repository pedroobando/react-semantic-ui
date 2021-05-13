import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Dropdown, Image, Menu } from 'semantic-ui-react';
import { signOutFirebase } from '../../app/firestore/firebaseService';

const SignedInMenu = () => {
  const history = useHistory();
  const { currentUser } = useSelector((state) => state.auth);

  const handleSignedOut = async () => {
    history.push('/');
    await signOutFirebase();
  };

  return (
    <Menu.Item position="right">
      <Image avatar spaced="right" src={currentUser.photoURL || '/assets/user.png'} />
      <Dropdown pointing="top left" text={currentUser.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/createEvent" text="Create Event" icon="plus" />
          <Dropdown.Item text="My profile" icon="user" />
          <Dropdown.Item as={Link} to="/account" text="My account" icon="settings" />
          <Dropdown.Item onClick={() => handleSignedOut()} text="Sign out" icon="power" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};

export default SignedInMenu;
