import React from 'react';
import { Grid } from 'semantic-ui-react';

const RecipeDashboard = () => {
  return (
    <Grid>
      <Grid.Column width={10}>Recipes</Grid.Column>
      <Grid.Column width={6}>Recipe Navigation</Grid.Column>
    </Grid>
  );
};

export default RecipeDashboard;
