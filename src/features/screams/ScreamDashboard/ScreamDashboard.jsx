import React from 'react';
import { Grid } from 'semantic-ui-react';
import ScreamActivity from '../ScreamActivity/ScreamActivity';
import ScreamList from '../ScreamList/ScreamList';

const ScreamDashboard = () => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ScreamList />
      </Grid.Column>
      <Grid.Column width={6}>
        <ScreamActivity />
      </Grid.Column>
    </Grid>
  );
};

export default ScreamDashboard;
