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
  // state = { ...this.props.scream };

  // componentDidMount() {
  //   if (this.props.selectedScream !== null) {
  //     this.setState({
  //       ...this.props.selectedScream,
  //     });
  //   }
  // }
  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`screams/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`screams/${match.params.id}`);
  }

  onFormSubmit = async (values) => {
    console.log(values);
    try {
      if (this.props.initialValues.id) {
        this.props.updateScream(values);
        this.props.history.push(`/screams/${this.props.initialValues.id}`);
      } else {
        // const newScream = {
        //   ...values,
        //   id: cuid(),
        //   hostPhotoURL: '/assets/user.png',
        //   hostedBy: 'Bob',
        // };
        let createdScream = await this.props.createScream(values);
        this.props.history.push(`/screams/${createdScream.id}`);
      }
    } catch (error) {
      console.log(error);
    }

    // if (this.props.initialValues.id) {
    //   this.props.updateScream(values);
    //   this.props.history.push(`/screams/${this.props.initialValues.id}`);
    // } else {
    //   // const newScream = {
    //   //   ...values,
    //   //   id: cuid(),
    //   //   hostPhotoURL: '/assets/user.png',
    //   //   hostedBy: 'Bob',
    //   // };
    //   this.props.createScream(values);
    //   this.props.history.push(`/screams/${newScream.id}`);
    // }

    // evt.preventDefault();
    // if (this.state.id) {
    //   this.props.updateScream(this.state);
    //   this.props.history.push(`/screams/${this.state.id}`);
    // } else {
    //   const newScream = {
    //     ...this.state,
    //     id: cuid(),
    //     hostPhotoURL: '/assets/user.png',
    //   };
    //   this.props.createScream(newScream);
    //   this.props.history.push(`/screams`);
    // }
  };

  render() {
    //const { cancelFormOpen } = this.props;
    //const { body, date, hostedBy } = this.state;
    const {
      history,
      initialValues,
      invalid,
      submitting,
      pristine,
      //scream,
      //deleteScream,
      loading,
    } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
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
                // loading={loading}
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
                        ? () => history.push(`/screams/${initialValues.id}`)
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
