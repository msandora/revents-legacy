import React, { Component, Fragment } from 'react';
import RecipesListItem from './RecipesListItem';

class RecipesList extends Component {
  render() {
    const { recipes, deleteRecipe } = this.props;
    return (
      <Fragment>
        {recipes.map((recipe) => (
          <RecipesListItem
            key={recipe.id}
            recipe={recipe}
            deleteRecipe={deleteRecipe}
          />
        ))}
      </Fragment>
    );
  }
}

export default RecipesList;
