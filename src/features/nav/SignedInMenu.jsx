import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Dropdown, Image, Menu } from 'semantic-ui-react';
import { signOutUser } from '../auth/authActions';

const SignedInMenu = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  const handleSignedOut = () => {
    dispatch(signOutUser());
    history.push('/');
  };

  return (
    <Menu.Item position="right">
      <Image avatar spaced="right" src={currentUser.photoURL || '/assets/user.png'} />
      <Dropdown pointing="top left" text={currentUser.email}>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/createEvent" text="Create Event" icon="plus" />
          <Dropdown.Item text="My profile" icon="user" />
          <Dropdown.Item onClick={() => handleSignedOut()} text="Sign out" icon="power" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};

export default SignedInMenu;
