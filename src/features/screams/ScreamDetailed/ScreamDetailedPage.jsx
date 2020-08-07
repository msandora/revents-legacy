import React from 'react';
import { connect } from 'react-redux';
import { Grid, SegmentGroup } from 'semantic-ui-react';
import ScreamDetailedInfo from './ScreamDetailedInfo';
import ScreamDetailedChat from './ScreamDetailedChat';
import ScreamDetailedHeader from './ScreamDetailedHeader';

const mapState = (state, ownProps) => {
  const screamId = ownProps.match.params.id;
  let scream = {};
  if (screamId && state.screams.length > 0) {
    scream = state.screams.filter((scream) => scream.id === screamId)[0];
  }
  return {
    scream,
  };
};

const ScreamDetailedPage = ({ scream }) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <SegmentGroup>
          <ScreamDetailedHeader scream={scream} />
          <ScreamDetailedInfo scream={scream} />
        </SegmentGroup>
      </Grid.Column>
      <Grid.Column width={6}>
        <ScreamDetailedChat scream={scream} />
      </Grid.Column>
    </Grid>
  );
};

export default connect(mapState)(ScreamDetailedPage);
