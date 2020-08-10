import React, { Fragment } from 'react';
import { Segment, Grid, Icon } from 'semantic-ui-react';

const RecipesDetailedInfo = ({ recipe }) => {
  return (
    <Fragment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='marker' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{recipe.ingredients}</span>
          </Grid.Column>
          <Grid.Column width={4}></Grid.Column>
        </Grid>
      </Segment>
      <Segment attached='bottom'>
        <Grid>
          <Grid.Column width={1}>
            <Icon size='large' color='teal' name='info' />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{recipe.body}</p>
          </Grid.Column>
        </Grid>
      </Segment>
    </Fragment>
  );
};

export default RecipesDetailedInfo;
