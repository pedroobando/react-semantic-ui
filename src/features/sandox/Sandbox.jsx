import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { openModal } from '../../app/common/modals/modalReducer';
import { decrement, increment } from './testRedux';

const Sandbox = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.test.data);

  return (
    <>
      <h1>Testing 123</h1>
      <h2>The data is: {data}</h2>
      <Button onClick={() => dispatch(increment(10))} content="Increment" color="green" />
      <Button onClick={() => dispatch(decrement(20))} content="Decrement" color="red" />
      <Button
        onClick={() =>
          dispatch(openModal({ modalType: 'TestModal', modalProps: { data } }))
        }
        content="Open Modal"
        color="teal"
      />
    </>
  );
};

export default Sandbox;
