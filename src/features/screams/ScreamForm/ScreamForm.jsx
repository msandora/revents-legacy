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
import { createScream, updateScream } from '../screamActions';
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
  createScream,
  updateScream,
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
        this.props.updateScream(values);
        this.props.history.push(`/screams/${this.props.initialValues.id}`);
      } else {
        let createdScream = await this.props.createScream(values);
        this.props.history.push(`/screams/${createdScream.id}`);
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
      // scream,
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
                name='body'
                component={TextArea}
                placeholder='What is on your mind?'
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
