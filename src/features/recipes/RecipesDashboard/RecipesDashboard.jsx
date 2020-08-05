import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from 'semantic-ui-react';
import RecipesList from '../RecipesList/RecipesList';
import cuid from 'cuid';
import RecipesForm from '../RecipesForm/RecipesForm';
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
  state = {
    isOpen: false,
    selectedRecipe: null,
  };

  handleCreateFormOpen = () => {
    this.setState({
      isOpen: true,
      selectedRecipe: null,
    });
  };

  handleFormCancel = () => {
    this.setState({
      isOpen: false,
    });
  };

  handleCreateRecipe = (newRecipe) => {
    newRecipe.id = cuid();
    newRecipe.hostPhotoURL = '/assets/user.png';
    this.props.createRecipe(newRecipe);
    this.setState(({ recipes }) => ({
      // recipes: [...recipes, newRecipe],
      isOpen: false,
    }));
  };

  handleSelectRecipe = (recipe) => {
    this.setState({
      selectedRecipe: recipe,
      isOpen: true,
    });
  };

  handleUpdateRecipe = (updatedRecipe) => {
    this.props.updateRecipe(updatedRecipe);
    this.setState(({ recipes }) => ({
      // recipes: recipes.map((recipe) => {
      //   if (recipe.id === updatedRecipe.id) {
      //     return { ...updatedRecipe };
      //   } else {
      //     return recipe;
      //   }
      // }),
      isOpen: false,
      selectedRecipe: null,
    }));
  };

  handleDeleteRecipe = (id) => {
    this.props.deleteRecipe(id);
    // this.setState(({ recipes }) => ({
    //   recipes: recipes.filter((e) => e.id !== id),
    // }));
  };

  render() {
    const { isOpen, selectedRecipe } = this.state;
    const { recipes } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <RecipesList
            recipes={recipes}
            selectRecipe={this.handleSelectRecipe}
            deleteRecipe={this.handleDeleteRecipe}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <RecipesSidebar />
          <Button
            onClick={this.handleCreateFormOpen}
            positive
            content='Create Recipe'
          />
          {isOpen && (
            <RecipesForm
              key={selectedRecipe ? selectedRecipe.id : 0}
              updateRecipe={this.handleUpdateRecipe}
              selectedRecipe={selectedRecipe}
              createRecipe={this.handleCreateRecipe}
              cancelFormOpen={this.handleFormCancel}
            />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapState, actions)(RecipesDashboard);
