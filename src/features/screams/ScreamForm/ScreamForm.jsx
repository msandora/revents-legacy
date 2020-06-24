/* global google */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withFirestore } from 'react-redux-firebase';
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan,
} from 'revalidate';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { createScream, updateEvent } from '../screamActions';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';

const mapState = (state, ownProps) => {
  const screamId = ownProps.match.params.id;

  let scream = {};

  if (
    state.firestore.ordered.screams &&
    state.firestore.ordered.screams.length > 0
  ) {
    scream =
      state.firestore.ordered.screams.filter(
        (scream) => scream.id === screamId
      )[0] || {};
  }

  return {
    initialValues: scream,
    scream,
  };
};

const actions = {
  createEvent,
  updateEvent,
};

const validate = combineValidators({
  title: isRequired({ message: 'Title is required' }),
  description: composeValidators(
    isRequired({ message: 'Please enter a description' }),
    hasLengthGreaterThan(4)({
      message: 'Description needs to be at least 5 characters',
    })
  )(),
  date: isRequired('date'),
});


class ScreamForm extends Component {
  async componentDidMount() {
    // This can be done with firestoreConnect higher order component
    const { firestore, match } = this.props;
    await firestore.setListener(`screams/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`screams/${match.params.id}`);
  }

  onFormSubmit = async (values) => {
    try {
      if (this.props.initialValues.id) {
        // if (Object.keys(values.venueLatLng).length === 0) {
        //   values.venueLatLng = this.props.event.venueLatLng;
        // }
        this.props.updateEvent(values);
        this.props.history.push(`/screams/${this.props.initialValues.id}`);
      } else {
        let createdEvent = await this.props.createEvent(values);
        this.props.history.push(`/screams/${createdEvent.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };



  render() {
    const {
      history,
      initialValues,
      invalid,
      submitting,
      pristine,
      scream,
    } = this.props;

    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color='teal' content='Scream Details' />
            <Form
              onSubmit={this.props.handleSubmit(this.onFormSubmit)}
              autoComplete='off'
            >
              <Field
                name='title'
                component={TextInput}
                placeholder='Give your scream name'
              />

              <Field
                name='description'
                component={TextArea}
                placeholder='Tell us about your scream'
              />


              <Button
                disabled={invalid || submitting || pristine}
                positive
                type='submit'
              >
                Submit
              </Button>
              <Button
                onClick={
                  initialValues.id
                    ? () => history.push(`/screams/${initialValues.id}`)
                    : () => history.push('/screams')
                }
                type='button'
              >
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withFirestore(
  connect(
    mapState,
    actions
  )(
    reduxForm({ form: 'screamForm', validate, enableReinitialize: true })(
      ScreamForm
    )
  )
);
