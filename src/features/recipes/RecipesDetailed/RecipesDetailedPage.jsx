import React from 'react';
import { connect } from 'react-redux';

import { Grid } from 'semantic-ui-react';
import RecipesDetailedHeader from './RecipesDetailedHeader';
import RecipesDetailedInfo from './RecipesDetailedInfo';
import RecipesDetailedSidebar from './RecipesDetailedSidebar';

// const staticRecipe = {
//   id: '1',
//   title: 'My Static Recipe',
//   date: '2018-03-27',
//   category: 'breakfast',
//   description: 'Recipe Description',
//   city: 'London, UK',
//   venue: "Tower of London, St Katharine's & Wapping, London",
//   body:
//     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
//   hostedBy: 'Bobby',
//   hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
//   attendees: [
//     {
//       id: 'a',
//       name: 'Bobby',
//       photoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
//     },
//     {
//       id: 'b',
//       name: 'Tom',
//       photoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
//     },
//   ],
//   commentCount: 0,
//   likeCount: 0,
// };

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
        <RecipesDetailedHeader recipe={recipe} />
        <RecipesDetailedInfo recipe={recipe} />
      </Grid.Column>
      <Grid.Column width={6}>
        <RecipesDetailedSidebar recipe={recipe} />
      </Grid.Column>
    </Grid>
  );
};

export default connect(mapState)(RecipesDetailedPage);
