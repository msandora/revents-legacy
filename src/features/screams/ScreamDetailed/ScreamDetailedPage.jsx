import React from 'react';
import { Grid } from 'semantic-ui-react';
import ScreamDetailedHeader from './ScreamDetailedHeader';
import ScreamDetailedInfo from './ScreamDetailedInfo';
import ScreamDetailedChat from './ScreamDetailedChat';
import ScreamDetailedSidebar from './ScreamDetailedSidebar';

const staticScream = {
  id: '1',
  title: 'My Static Scream',
  date: '2018-03-27',
  category: 'food',
  description: 'Scream Description',
  city: 'London, UK',
  venue: "Tower of London, St Katharine's & Wapping, London",
  body:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
  hostedBy: 'Bobby',
  hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
  attendees: [
    {
      id: 'a',
      name: 'Bobby',
      photoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    },
    {
      id: 'b',
      name: 'Tom',
      photoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
    },
  ],
  commentCount: 0,
  likeCount: 0,
};

const ScreamDetailedPage = () => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ScreamDetailedHeader scream={staticScream} />
        <ScreamDetailedInfo scream={staticScream} />
        <ScreamDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ScreamDetailedSidebar attendees={staticScream.attendees} />
      </Grid.Column>
    </Grid>
  );
};

export default ScreamDetailedPage;
