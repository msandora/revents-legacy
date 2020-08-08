import React, { Component } from 'react';
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
import { createScream, updateScream } from '../screamActions';
import TextArea from '../../../app/common/form/TextArea';
import cuid from 'cuid';

const mapState = (state, ownProps) => {
  const screamId = ownProps.match.params.id;
  let scream = {
    // body: '',
    // date: '',
    // hostedBy: '',
  };

  if (screamId && state.screams.length > 0) {
    scream = state.screams.filter((scream) => scream.id === screamId)[0];
  }
  return {
    initialValues: scream,
  };
};

const actions = {
  createScream,
  updateScream,
};

const validate = combineValidators({
  body: isRequired({ message: 'The event title is required' }),
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

  onFormSubmit = (values) => {
    console.log(values);

    if (this.props.initialValues.id) {
      this.props.updateScream(values);
      this.props.history.push(`/screams/${this.props.initialValues.id}`);
    } else {
      const newScream = {
        ...values,
        id: cuid(),
        hostPhotoURL: '/assets/user.png',
        hostedBy: 'Bob',
      };
      this.props.createScream(newScream);
      this.props.history.push(`/screams/${newScream.id}`);
    }

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
    // const { cancelFormOpen } = this.props;
    //const { body, date, hostedBy } = this.state;
    const {
      history,
      initialValues,
      invalid,
      submitting,
      pristine,
      // event,
      // cancelToggle,
      // loading
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

export default connect(
  mapState,
  actions
)(
  reduxForm({
    form: 'screamForm',
    validate,
    //, enableReinitialize: true
  })(ScreamForm)
);
