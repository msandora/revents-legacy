import React from 'react';
import { Segment, Item } from 'semantic-ui-react';

const ScreamDetailsInfo = ({ scream }) => {
  return (
    <Segment attached>
      <Item.Group>
        <Item>
          <span style={{ whiteSpace: 'pre-wrap' }}>{scream.body}</span>
        </Item>
      </Item.Group>
    </Segment>
  );
};

export default ScreamDetailsInfo;
