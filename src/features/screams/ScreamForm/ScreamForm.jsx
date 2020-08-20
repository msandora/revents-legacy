import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { combineValidators, isRequired } from 'revalidate';
import {
  Segment,
  Form,
  Button,
  Icon,
  Popup,
  Header,
  Grid,
} from 'semantic-ui-react';
import { createScream, updateScream, deleteScream } from '../screamActions';
import TextArea from '../../../app/common/form/TextArea';
import { withFirestore } from 'react-redux-firebase';
import ScreamImageUpload from './ScreamImageUpload';

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
  deleteScream,
};

const validate = combineValidators({
  body: isRequired({ message: 'body is required' }),
});

class ScreamForm extends Component {
  async componentDidMount() {
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
        this.props.history.push(
          `/screams/details/${this.props.initialValues.id}`
        );
      } else {
        let createdScream = await this.props.createScream(values);
        this.props.history.push(`/screams/details/${createdScream.id}`);
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
      // deleteScream,
      loading,
    } = this.props;
    return (
      <Grid>
        <Grid.Column width={12}>
          <Segment>
            <ScreamImageUpload scream={scream} />
            <Header sub color='teal' content='Post details' />

            <Form
              onSubmit={this.props.handleSubmit(this.onFormSubmit)}
              autoComplete='off'
            >
              <Field
                name='body'
                component={TextArea}
                rows={3}
                placeholder={'Body'}
              />

              <Button
                disabled={invalid || submitting || pristine}
                loading={loading}
                positive
                type='submit'
              >
                Submit
              </Button>
              <Popup
                content='Go back'
                trigger={
                  <Button
                    floated='right'
                    icon
                    disabled={loading}
                    onClick={
                      initialValues.id
                        ? () =>
                            history.push(`/screams/details/${initialValues.id}`)
                        : () => history.push('/screams')
                    }
                    type='button'
                  >
                    <Icon name='cancel' />
                  </Button>
                }
              />
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
