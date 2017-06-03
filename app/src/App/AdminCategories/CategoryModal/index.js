import React, { Component } from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

class CategoryModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.getValidationState = this.getValidationState.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const { category } = this.props;
    const edit = category && category.id;
    const title = !edit ? 'Create category' : 'Edit category';

    return (
      <div className="static-modal">
        <Modal show={this.props.show} onHide={this.props.onCancel}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup
                controlId="formBasicText"
                validationState={() => this.getValidationState()}
              >
                <ControlLabel>Category Name</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="Enter text"
                  onChange={this.props.handleChange}
                />
                <FormControl.Feedback />
                <HelpBlock>Validation is based on string length.</HelpBlock>
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.saveCategory}>Save</Button>
            <Button onClick={this.props.updateCategory}>Save</Button>
            <Button onClick={this.props.onCancel}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

CategoryModal.defaultProps = {
  onCancel: function() {},
  handleChange: function() {},
  saveCategory: function() {},
  updateCategory: function() {}
}

export default CategoryModal;
