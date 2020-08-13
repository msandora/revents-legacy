import React, { Fragment } from 'react';
import { Header, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';

const ScreamDetailsHeader = ({ scream }) => {
  // console.log(scream);
  return (
    <Fragment>
      <Header as='h3'>
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
    </Fragment>
  );
};

export default ScreamDetailsHeader;
