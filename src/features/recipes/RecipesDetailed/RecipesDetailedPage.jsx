import React from 'react';
import { Grid } from 'semantic-ui-react';
import RecipesDetailedHeader from './RecipesDetailedHeader';
import RecipesDetailedInfo from './RecipesDetailedInfo';
import RecipesDetailedChat from './RecipesDetailedChat';
import RecipesDetailedSidebar from './RecipesDetailedSidebar';

const staticRecipe = {
  id: '1',
  title: 'My Static Recipe',
  date: '2018-03-27',
  category: 'food',
  description: 'Recipe Description',
  city: 'London, UK',
  venue: "Tower of London, St Katharine's & Wapping, London",
  body:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
  hostedBy: 'Bobby',
  hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
  attendees: [
    {
      id: 'a',
      name: 'Bobby',
      photoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    },
    {
      id: 'b',
      name: 'Tom',
      photoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
    },
  ],
  commentCount: 0,
  likeCount: 0,
};

const RecipesDetailedPage = () => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <RecipesDetailedHeader recipe={staticRecipe} />
        <RecipesDetailedInfo recipe={staticRecipe} />
        <RecipesDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <RecipesDetailedSidebar attendees={staticRecipe.attendees} />
      </Grid.Column>
    </Grid>
  );
};

export default RecipesDetailedPage;
