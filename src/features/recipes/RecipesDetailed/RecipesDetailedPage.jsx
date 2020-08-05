import React from 'react';
import { Grid } from 'semantic-ui-react';
import RecipesDetailedHeader from './RecipesDetailedHeader';
import RecipesDetailedInfo from './RecipesDetailedInfo';
import RecipesDetailedChat from './RecipesDetailedChat';
import RecipesDetailedSidebar from './RecipesDetailedSidebar';

const ScreamDetailedPage = () => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <RecipesDetailedHeader />
        <RecipesDetailedInfo />
        <RecipesDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <RecipesDetailedSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default ScreamDetailedPage;
