import React, { Fragment } from 'react';
import { Header, Segment } from 'semantic-ui-react';

const ScreamActivity = () => {
  return (
    <Fragment>
      <Header attached='top' content='Recent Activity' />
      <Segment attached>
        <p>Social Activity</p>
      </Segment>
    </Fragment>
  );
};

export default ScreamActivity;
