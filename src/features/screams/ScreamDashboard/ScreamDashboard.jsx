import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';

import { Grid, Loader } from 'semantic-ui-react';
import ScreamList from '../ScreamList/ScreamList';
import { getScreamsForDashboard } from '../screamActions';
import ScreamSidebar from '../ScreamSidebar/ScreamSidebar';
import ScreamActivity from '../ScreamActivity/ScreamActivity';
import LoadingComponent from '../../../app/layout/LoadingComponent';

const mapState = (state) => ({
  screams: [],
  loading: state.async.loading,
});

const actions = {
  getScreamsForDashboard,
};

class ScreamDashboard extends Component {
  contextRef = createRef();

  state = {
    moreScreams: false,
    loadingInitial: true,
    loadedScreams: [],
  };

  async componentDidMount() {
    let next = await this.props.getScreamsForDashboard();

    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreScreams: true,
        loadingInitial: false,
      });
    }
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.screams !== prevProps.screams) {
      this.setState({
        loadedScreams: [...this.state.loadedScreams, ...this.props.screams],
      });
    }
  };

  getNextScreams = async () => {
    const { screams } = this.props;
    let lastScream = screams && screams[screams.length - 1];
    let next = await this.props.getScreamsForDashboard(lastScream);
    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreScreams: false,
      });
    }
  };

  // state = {
  //   isOpen: false,
  //   selectedScream: null,
  // };

  // handleCreateFormOpen = () => {
  //   this.setState({
  //     isOpen: true,
  //     selectedScream: null,
  //   });
  // };

  // handleFormCancel = () => {
  //   this.setState({
  //     isOpen: false,
  //   });
  // };

  // handleCreateScream = (newScream) => {
  //   newScream.id = cuid();
  //   newScream.hostPhotoURL = '/assets/user.png';
  //   this.props.createScream(newScream);
  //   // this.setState(({ screams }) => ({
  //   //   // screams: [...screams, newScream],
  //   //   isOpen: false,
  //   // }));
  // };

  // handleSelectScream = (scream) => {
  //   this.setState({
  //     selectedScream: scream,
  //     isOpen: true,
  //   });
  // };

  // handleUpdateScream = (updatedScream) => {
  //   this.props.updateScream(updatedScream);
  //   // this.setState(({ screams }) => ({
  //   //   // screams: screams.map((scream) => {
  //   //   //   if (scream.id === updatedScream.id) {
  //   //   //     return { ...updatedScream };
  //   //   //   } else {
  //   //   //     return scream;
  //   //   //   }
  //   //   // }),
  //   //   isOpen: false,
  //   //   selectedScream: null,
  //   // }));
  // };

  // handleDeleteScream = (id) => {
  //   this.props.deleteScream(id);
  //   // this.setState(({ screams }) => ({
  //   //   screams: screams.filter((e) => e.id !== id),
  //   // }));
  // };

  render() {
    // const { isOpen, selectedScream } = this.state;
    const { screams } = this.props;
    const { moreScreams, loadedScreams } = this.state;

    if (!isLoaded(screams)) return <LoadingComponent />;
    return (
      <Grid>
        <Grid.Column width={10}>
          <ScreamList
            // loading={loading}
            screams={loadedScreams}
            moreScreams={moreScreams}
            getNextScreams={this.getNextScreams}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <ScreamSidebar />
          <ScreamActivity />
          {/*
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
          )} */}
        </Grid.Column>
        <Grid.Column width={10}>
          {/* <Loader active={loading} /> */}
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapState,
  actions
)(firestoreConnect([{ collection: 'screams' }])(ScreamDashboard));
