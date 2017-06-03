import React, { Component } from 'react';
import { Grid, Row, Col, PageHeader, Button } from 'react-bootstrap';
import CategoryModal from './CategoryModal';
import CategoriesList from './CategoriesList';
import './AdminCategories.css';

class AdminCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      category: null,
      status: 'init',
      error: null,
      showModal: false,
      selected: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories() {
    this.setState(prevState => ({
      ...prevState,
      status: 'pending'
    }));

    fetch('http://localhost:3500/categories')
      .then(response => response.json())
      .then(data => {
        this.setState(prevState => ({
          ...prevState,
          status: 'success',
          categories: data
        }));
      })
      .catch(err => {
        this.setState(prevState => ({
          ...prevState,
          status: 'failure',
          error: err.message
        }));
      });
  }

  handleSave(category) {
    const { category } = this.state;
    category.id ? this.update(category) : this.save(category);
  }

  save(category) {}

  removeCategory(category) {}

  updateCategory(category) {}

  addCategory(category) {
    this.setState(prevState => ({
      ...prevState,
      showModal: true
    }));
  }

  hideModal() {
    this.setState(prevState => ({
      ...prevState,
      showModal: false,
      selected: false
    }));
  }

  handleChange(event) {
    console.log('handleChange AFUERA', event);
    this.setState(prevState => ({
      label: event.target.value
    }));
  }

  render() {
    const { categories, status, error, showModal, selected } = this.state;
    console.log(this.state.label);
    return (
      <Grid>
        <PageHeader>
          Categories admin <small>Create, edit and remove categories</small>
        </PageHeader>

        <Row>
          <Col md={12}>
            <div className="AdminCategories-mainAction">
              <Button bsStyle="primary" bsSize="xs" onClick={() => this.addCategory()}>New Category</Button>
            </div>
          </Col>
        </Row>

        <Row>
          {status === 'pending' && <Col md={12}>Loading...</Col>}

          {status === 'failure' && <div>Error: {error} </div>}

          {status === 'success' && <CategoriesList items={categories} />}
        </Row>

        <CategoryModal
          onCancel={() => this.hideModal()}
          show={showModal}
          selected={selected}
          handleChange={this.handleChange}
          saveCategory={this.saveCAtegory}
        />
      </Grid>
    );
  }
}

export default AdminCategories;
