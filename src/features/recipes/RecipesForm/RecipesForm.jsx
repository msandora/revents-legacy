import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import {
  combineValidators,
  composeValidators,
  isRequired,
  hasLengthGreaterThan,
} from 'revalidate';
import {
  Segment,
  Form,
  Button,
  Icon,
  Popup,
  Header,
  Grid,
} from 'semantic-ui-react';
import { createRecipe, updateRecipe } from '../RecipesActions';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
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
  title: isRequired({ message: 'The recipe title is required' }),
  category: isRequired({ message: 'The category is required' }),
  ingredients: composeValidators(
    isRequired({ message: 'Please enter a description' }),
    hasLengthGreaterThan(4)({
      message: 'Description needs to be at least 5 characters',
    })
  )(),
  body: isRequired({ message: 'body is required' }),
});

const category = [
  { key: 'breakfast', text: 'Breakfast', value: 'breakfast' },
  { key: 'desserts', text: 'Desserts', value: 'desserts' },
  { key: 'entrees', text: 'Entrees', value: 'entrees' },
  { key: 'beverages', text: 'Beverages', value: 'beverages' },
  { key: 'appetizers', text: 'Appetizers', value: 'appetizers' },
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
      history,
      initialValues,
      invalid,
      submitting,
      pristine,
      // loading,
    } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color='teal' content='Recipe details' />
            <Form
              onSubmit={this.props.handleSubmit(this.onFormSubmit)}
              autoComplete='off'
            >
              <Field
                name='title'
                component={TextInput}
                placeholder='Give your recipe a name'
              />
              <Field
                name='category'
                component={SelectInput}
                options={category}
                placeholder='Select a category?'
              />
              <Field
                name='body'
                component={TextArea}
                rows={3}
                placeholder='How is it made?'
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
                        ? () => history.push(`/recipes/${initialValues.id}`)
                        : () => history.push('/recipes')
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
  reduxForm({ form: 'recipesForm', validate, enableReinitialize: true })(
    RecipesForm
  )
);
