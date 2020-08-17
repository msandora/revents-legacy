import React from 'react';
import { Header, Image, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';

const ScreamDetailedHeader = ({ scream, isHost }) => {
  return (
    <Segment attached>
      <Header as='h5'>
        <Image
          circular
          src={scream.hostPhotoURL}
          as={Link}
          to={`/screams/${scream.id}`}
        />
        <Header.Content>
          {scream.hostedBy}
          <Header.Subheader>
            {formatDistance(
              scream.createdAt && scream.createdAt.toDate(),
              Date.now()
            )}{' '}
            ago
          </Header.Subheader>
        </Header.Content>
      </Header>
    </Segment>
  );
};

export default ScreamDetailedHeader;
