import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "react-bootstrap";
import Button from "Components/Button/Button";

//css
import "./Modal.css";

const ModalPopUp = ({ type, show, handleClose, title, item, content }) => {
  if (type === "delete") {
    return (
      <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="modal-title-add-service">{title}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row mt-5 mb-5 text-center">
            <FontAwesomeIcon
              icon={"trash-can"}
              aria-hidden="true"
              className="delete-icon"
            />
            <p className="delete-content">
              Are you sure you want to delete <b>{item}</b>?
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="cancel-modal" onClick={handleClose} />
          <Button type="delete-modal" onClick={handleClose} />
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>
          <span className="modal-title-add-service">{title}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row mt-5 mb-5 text-center">
          <p className="delete-content">
           {content}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button type="cancel-modal" onClick={handleClose} />
      </Modal.Footer>
    </Modal>
  );


};

ModalPopUp.propTypes = {
  type: PropTypes.string,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  title: PropTypes.string,
  item: PropTypes.string,
  content: PropTypes.string,
};

export default ModalPopUp;
