import React from 'react';
import { Segment, Header, Grid, Image } from 'semantic-ui-react';
import { differenceInYears } from 'date-fns';
// import LazyLoad from 'react-lazyload';

const UserDetailedHeader = ({ profile }) => {
  const age =
    profile.dateOfBirth &&
    differenceInYears(Date.now(), profile.dateOfBirth.toDate());
  return (
    <Grid.Column width={16}>
      <Segment>
        <Header as='h1'>
          <Image circular src={profile.photoURL || '/assets/user.png'}  size='massive'/>   
          <Header.Content>
            {profile.displayName}
            <Header.Subheader>{profile.occupation}</Header.Subheader>
            <Header.Subheader>{age || 'unknown age'}, Lives in{' '}
                {profile.city || 'unknown city'}</Header.Subheader>
          </Header.Content>
        </Header>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedHeader;
