import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import RecipesList from '../RecipesList/RecipesList';
import cuid from 'cuid';
import RecipesForm from '../RecipesForm/RecipesForm';

const recipesFromDashboard = [
  {
    id: '1',
    title: 'Green Eggs and Ham',
    date: '2018-03-27',
    category: 'Breakfast',
    ingredients: '2 Eggs, 1 slice of Ham',
    body: 'I do not like Green Eggs and Ham.',
    hostedBy: 'Bob',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    commentCount: 0,
    likeCount: 0,
  },
  {
    id: '2',
    title: 'Chocolate Chip Pancakes',
    date: '2018-03-28',
    category: 'Breakfast',
    ingredients: 'Pancake mix, Chocolate Chips',
    body: 'I love Pancakes.',
    hostedBy: 'Tom',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
    commentCount: 0,
    likeCount: 0,
  },
];

class RecipesDashboard extends Component {
  state = {
    recipes: recipesFromDashboard,
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
    this.setState(({ recipes }) => ({
      recipes: [...recipes, newRecipe],
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
    this.setState(({ recipes }) => ({
      recipes: recipes.map((recipe) => {
        if (recipe.id === updatedRecipe.id) {
          return { ...updatedRecipe };
        } else {
          return recipe;
        }
      }),
      isOpen: false,
      selectedRecipe: null,
    }));
  };

  handleDeleteRecipe = (id) => {
    this.setState(({ recipes }) => ({
      recipes: recipes.filter((e) => e.id !== id),
    }));
  };

  render() {
    const { recipes, isOpen, selectedRecipe } = this.state;
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

export default RecipesDashboard;
