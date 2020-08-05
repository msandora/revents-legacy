import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from 'semantic-ui-react';
import ScreamList from '../ScreamList/ScreamList';
import cuid from 'cuid';
import ScreamForm from '../ScreamForm/ScreamForm';
import ScreamSidebar from '../ScreamSidebar/ScreamSidebar';
import { createScream, updateScream, deleteScream } from '../screamActions';

const mapState = (state) => ({
  screams: state.screams,
});

const actions = {
  createScream,
  updateScream,
  deleteScream,
};

class ScreamDashboard extends Component {
  state = {
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
    this.props.createScream(newScream);
    this.setState(({ screams }) => ({
      // screams: [...screams, newScream],
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
    this.props.updateScream(updatedScream);
    this.setState(({ screams }) => ({
      // screams: screams.map((scream) => {
      //   if (scream.id === updatedScream.id) {
      //     return { ...updatedScream };
      //   } else {
      //     return scream;
      //   }
      // }),
      isOpen: false,
      selectedScream: null,
    }));
  };

  handleDeleteScream = (id) => {
    this.props.deleteScream(id);
    // this.setState(({ screams }) => ({
    //   screams: screams.filter((e) => e.id !== id),
    // }));
  };

  render() {
    const { isOpen, selectedScream } = this.state;
    const { screams } = this.props;
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

export default connect(mapState, actions)(ScreamDashboard);
