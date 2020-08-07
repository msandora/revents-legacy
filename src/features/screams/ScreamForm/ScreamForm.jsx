import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Form, Button, Icon, Popup } from 'semantic-ui-react';
import { createScream, updateScream } from '../screamActions';
import cuid from 'cuid';

const mapState = (state, ownProps) => {
  const screamId = ownProps.match.params.id;
  let scream = {
    body: '',
    date: '',
    hostedBy: '',
  };

  if (screamId && state.screams.length > 0) {
    scream = state.screams.filter((scream) => scream.id === screamId)[0];
  }
  return {
    scream,
  };
};

const actions = {
  createScream,
  updateScream,
};

class ScreamForm extends Component {
  state = { ...this.props.scream };

  componentDidMount() {
    if (this.props.selectedScream !== null) {
      this.setState({
        ...this.props.selectedScream,
      });
    }
  }

  handleFormSubmit = (evt) => {
    evt.preventDefault();
    if (this.state.id) {
      this.props.updateScream(this.state);
      this.props.history.push(`/screams/${this.state.id}`);
    } else {
      const newScream = {
        ...this.state,
        id: cuid(),
        hostPhotoURL: '/assets/user.png',
      };
      this.props.createScream(newScream);
      this.props.history.push(`/screams`);
    }
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    // const { cancelFormOpen } = this.props;
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
          <Popup
            content='Go back'
            trigger={
              <Button
                floated='right'
                icon
                onClick={this.props.history.goBack}
                type='button'
              >
                <Icon name='cancel' />
              </Button>
            }
          />
        </Form>
      </Segment>
    );
  }
}

export default connect(mapState, actions)(ScreamForm);
