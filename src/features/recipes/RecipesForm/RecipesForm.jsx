import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import {
  combineValidators,
  composeValidators,
  isRequired,
  hasLengthGreaterThan,
} from 'revalidate';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { createRecipe, updateRecipe } from '../RecipesActions';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import cuid from 'cuid';

const mapState = (state, ownProps) => {
  const recipeId = ownProps.match.params.id;
  let recipe = {
    // body: '',
    // date: '',
    // hostedBy: '',
  };

  if (recipeId && state.recipes.length > 0) {
    recipe = state.recipes.filter((recipe) => recipe.id === recipeId)[0];
  }
  return {
    initialValues: recipe,
  };
};

const actions = {
  createRecipe,
  updateRecipe,
};

const validate = combineValidators({
  title: isRequired({ message: 'The event title is required' }),
  category: isRequired({ message: 'The category is required' }),
  description: composeValidators(
    isRequired({ message: 'Please enter a description' }),
    hasLengthGreaterThan(4)({
      message: 'Description needs to be at least 5 characters',
    })
  )(),
  date: isRequired('date'),
});

const category = [
  { key: 'breakfast', text: 'Breakfast', value: 'breakfast' },
  { key: 'desserts', text: 'Desserts', value: 'desserts' },
  { key: 'entrees', text: 'Entrees', value: 'entrees' },
  { key: 'beverages', text: 'Beverages', value: 'beverages' },
];

class RecipesForm extends Component {
  onFormSubmit = (values) => {
    console.log(values);

    if (this.props.initialValues.id) {
      this.props.updateRecipe(values);
      this.props.history.push(`/recipes/${this.props.initialValues.id}`);
    } else {
      const newRecipe = {
        ...values,
        id: cuid(),
        hostPhotoURL: '/assets/user.png',
        hostedBy: 'Bob',
      };
      this.props.createRecipe(newRecipe);
      this.props.history.push(`/recipes/${newRecipe.id}`);
    }
  };

  render() {
    const {
      // history,
      // initialValues,
      invalid,
      submitting,
      pristine,
      // loading,
    } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color='teal' content='Event details' />
            <Form
              onSubmit={this.props.handleSubmit(this.onFormSubmit)}
              autoComplete='off'
            >
              <Field
                name='title'
                component={TextInput}
                placeholder='Give your event a name'
              />
              <Field
                name='category'
                component={SelectInput}
                options={category}
                placeholder='What is your event about?'
              />
              <Field
                name='description'
                component={TextArea}
                rows={3}
                placeholder='Tell us about your event'
              />
              <Header sub color='teal' content='Event location details' />
              <Field
                name='date'
                component={DateInput}
                dateFormat='dd LLL yyyy h:mm a'
                placeholder='Event date'
                showTimeSelect
                timeFormat='HH:mm'
              />
              <Button
                disabled={invalid || submitting || pristine}
                // loading={loading}
                positive
                type='submit'
              >
                Submit
              </Button>
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
  reduxForm({ form: 'recipesForm', validate, enableReinitialize: true })(
    RecipesForm
  )
);
