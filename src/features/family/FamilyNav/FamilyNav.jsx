import React, { Component } from 'react';
import { Segment, Button } from 'semantic-ui-react';

class FamilyNav extends Component {
  render() {
    return (
      <Segment>
        <Button
          type='button'
          color='blue'
          content='sandora-gentile family'
        ></Button>
      </Segment>
    );
  }
}

export default FamilyNav;
