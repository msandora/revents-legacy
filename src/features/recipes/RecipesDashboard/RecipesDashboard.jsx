import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import RecipesList from '../RecipesList/RecipesList';
import RecipesSidebar from '../RecipesSidebar/RecipesSidebar';
import { createRecipe, updateRecipe, deleteRecipe } from '../RecipesActions';

const mapState = (state) => ({
  recipes: state.recipes,
});

const actions = {
  createRecipe,
  updateRecipe,
  deleteRecipe,
};

class RecipesDashboard extends Component {
  handleDeleteRecipe = (id) => {
    this.props.deleteRecipe(id);
  };

  render() {
    const { recipes } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <RecipesList
            recipes={recipes}
            deleteRecipe={this.handleDeleteRecipe}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <RecipesSidebar />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapState, actions)(RecipesDashboard);
