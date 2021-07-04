import React, { Dispatch, SetStateAction } from 'react';
import { Modal} from 'react-bootstrap';
interface Props {
  //declare props here
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}


const NoResult = ({ show, setShow }: Props) => {

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  return (
    <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          
        </Modal.Header>
        <Modal.Body>No Result!, try again</Modal.Body>
      </Modal>
    </>
  );
};

export default NoResult;
