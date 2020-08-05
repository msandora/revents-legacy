import React from 'react';
import { Grid } from 'semantic-ui-react';
import ScreamDetailedHeader from './ScreamDetailedHeader';
import ScreamDetailedInfo from './ScreamDetailedInfo';
import ScreamDetailedChat from './ScreamDetailedChat';
import ScreamDetailedSidebar from './ScreamDetailedSidebar';

const ScreamDetailedPage = () => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ScreamDetailedHeader />
        <ScreamDetailedInfo />
        <ScreamDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ScreamDetailedSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default ScreamDetailedPage;
