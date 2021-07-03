import React from 'react';
import { Alert, Button } from 'react-bootstrap';

interface Props {
  message: any;
  clearError: () => void;
}

function ErrorNotice(props: Props) {
  return (
    <div className='error-notice'>
      <Alert variant='danger'>
        {props.message}
        <Button onClick={props.clearError} variant='light' size='sm' style={{marginLeft:'13rem'}}>X</Button>
      </Alert>
    </div>
  );
}

export default ErrorNotice;
