import React from 'react';
import { Alert, Button } from 'react-bootstrap';

interface Props {
  message: any;
  clearError: () => void;
}

function ErrorNotice(props: Props) {
  return (
    <div className='error-notice'>
      <Alert>{props.message}</Alert>
      <Button onClick={props.clearError}>X</Button>
    </div>
  );
}

export default ErrorNotice;
