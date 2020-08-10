import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import FamilyTree from '../FamilyTree/FamilyTree';
// import FamilyNav from '../FamilyNav/FamilyNav';

class FamilyDashboard extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column width={16}>
          <FamilyTree />
        </Grid.Column>
        {/* <Grid.Column width={4}>
          <FamilyNav selectFamily={this.handleFamilySelect} />
        </Grid.Column> */}
      </Grid>
    );
  }
}

export default FamilyDashboard;
