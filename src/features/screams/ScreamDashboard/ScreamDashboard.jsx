import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import ScreamList from '../ScreamList/ScreamList';
import cuid from 'cuid';
import ScreamForm from '../ScreamForm/ScreamForm';
import ScreamSidebar from '../ScreamSidebar/ScreamSidebar';
// import ScreamActivity from '../ScreamActivity/ScreamActivity';

const screamsFromDashboard = [
  {
    id: '1',
    date: '2018-03-27',
    body:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    hostedBy: 'Bob',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    commentCount: 0,
    likeCount: 0,
  },
  {
    id: '2',
    date: '2018-03-28',
    body:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    hostedBy: 'Tom',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
    commentCount: 0,
    likeCount: 0,
  },
];

class ScreamDashboard extends Component {
  state = {
    screams: screamsFromDashboard,
    isOpen: false,
    selectedScream: null,
  };

  handleCreateFormOpen = () => {
    this.setState({
      isOpen: true,
      selectedScream: null,
    });
  };

  handleFormCancel = () => {
    this.setState({
      isOpen: false,
    });
  };

  handleCreateScream = (newScream) => {
    newScream.id = cuid();
    newScream.hostPhotoURL = '/assets/user.png';
    this.setState(({ screams }) => ({
      screams: [...screams, newScream],
      isOpen: false,
    }));
  };

  handleSelectScream = (scream) => {
    this.setState({
      selectedScream: scream,
      isOpen: true,
    });
  };

  handleUpdateScream = (updatedScream) => {
    this.setState(({ screams }) => ({
      screams: screams.map((scream) => {
        if (scream.id === updatedScream.id) {
          return { ...updatedScream };
        } else {
          return scream;
        }
      }),
      isOpen: false,
      selectedScream: null,
    }));
  };

  handleDeleteScream = (id) => {
    this.setState(({ screams }) => ({
      screams: screams.filter((e) => e.id !== id),
    }));
  };

  render() {
    const { screams, isOpen, selectedScream } = this.state;
    return (
      <Grid>
        <Grid.Column width={10}>
          <ScreamList
            screams={screams}
            selectScream={this.handleSelectScream}
            deleteScream={this.handleDeleteScream}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <ScreamSidebar />
          <Button
            onClick={this.handleCreateFormOpen}
            positive
            content='Create Scream'
          />
          {isOpen && (
            <ScreamForm
              key={selectedScream ? selectedScream.id : 0}
              updateScream={this.handleUpdateScream}
              selectedScream={selectedScream}
              createScream={this.handleCreateScream}
              cancelFormOpen={this.handleFormCancel}
            />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default ScreamDashboard;
