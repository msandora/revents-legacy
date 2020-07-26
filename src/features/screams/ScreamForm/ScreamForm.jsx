import React, { Component } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

class ScreamForm extends Component {
  state = {
    body: '',
    date: '',
    hostedBy: '',
  };

  handleFormSubmit = (evt) => {
    evt.preventDefault();
    this.props.createScream(this.state);
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { cancelFormOpen } = this.props;
    const { body, date, hostedBy } = this.state;
    return (
      <Segment>
        <Form onSubmit={this.handleFormSubmit} autoComplete='off'>
          <Form.Field>
            <label>Say Something</label>
            <input
              name='body'
              onChange={this.handleInputChange}
              value={body}
              placeholder='What would you like to say?'
            />
          </Form.Field>
          <Form.Field>
            <label>Scream Date</label>
            <input
              name='date'
              onChange={this.handleInputChange}
              value={date}
              type='date'
              placeholder='Scream Date'
            />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input
              name='hostedBy'
              onChange={this.handleInputChange}
              value={hostedBy}
              placeholder='Enter the name of person hosting'
            />
          </Form.Field>
          <Button positive type='submit'>
            Submit
          </Button>
          <Button onClick={cancelFormOpen} type='button'>
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default ScreamForm;
