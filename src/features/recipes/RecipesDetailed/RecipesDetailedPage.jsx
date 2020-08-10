import React from 'react';
import { connect } from 'react-redux';
import { Grid, SegmentGroup } from 'semantic-ui-react';
import RecipesDetailedHeader from './RecipesDetailedHeader';
import RecipesDetailedInfo from './RecipesDetailedInfo';

const mapState = (state, ownProps) => {
  const recipeId = ownProps.match.params.id;
  let recipe = {};
  if (recipeId && state.recipes.length > 0) {
    recipe = state.recipes.filter((recipe) => recipe.id === recipeId)[0];
  }
  return {
    recipe,
  };
};

const RecipesDetailedPage = ({ recipe }) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <SegmentGroup>
          <RecipesDetailedHeader recipe={recipe} />
          <RecipesDetailedInfo recipe={recipe} />
        </SegmentGroup>
      </Grid.Column>
      <Grid.Column width={6}></Grid.Column>
    </Grid>
  );
};

export default connect(mapState)(RecipesDetailedPage);
