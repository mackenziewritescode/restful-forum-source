import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./bootstrap.css";
import "./styles.scss";
import { confirmable, createConfirmation } from "react-confirm";

class Confirmation extends React.Component {
  render() {
    const { show, proceed, enableEscape = true, confirmation } = this.props;

    return (
      <div className="static-modal">
        <Modal
          show={show}
          onHide={() => proceed(false)}
          backdrop={enableEscape ? true : "static"}
          keyboard={enableEscape}
        >
          <Modal.Body>
            {confirmation === "post"
              ? "Are you sure you want to delete this post and its replies?"
              : "Are you sure you want to delete this reply?"}
          </Modal.Body>
          <Modal.Footer className="footer">
            <Button
              className="delete-button confirm-button"
              variant="danger"
              onClick={() => proceed(true)}
            >
              Delete
            </Button>
            <Button
              variant="secondary"
              className="cancel-button confirm-button"
              onClick={() => proceed(false)}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

Confirmation.propTypes = {
  show: PropTypes.bool,
  proceed: PropTypes.func,
  enableEscape: PropTypes.bool,
};

export function confirm(
  confirmation,
  proceedLabel = "OK",
  cancelLabel = "cancel",
  options = {}
) {
  return createConfirmation(confirmable(Confirmation))({
    confirmation,
    proceedLabel,
    cancelLabel,
    ...options,
  });
}
