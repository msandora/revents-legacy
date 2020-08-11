import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import { Grid, Loader } from 'semantic-ui-react';
import ScreamList from '../ScreamList/ScreamList';
import { getScreamsForDashboard } from '../screamActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
// import ScreamActivity from '../ScreamActivity/ScreamActivity';
import ScreamSidebar from '../ScreamSidebar/ScreamSidebar';

const query = [
  {
    collection: 'activity',
    orderBy: ['timestamp', 'desc'],
    limit: 5,
  },
];

const mapState = (state) => ({
  screams: state.screams.screams,
  loading: state.async.loading,
  activities: state.firestore.ordered.activity,
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

  render() {
    const { loading, activities } = this.props;
    const { moreScreams, loadedScreams } = this.state;
    // console.log(loadedScreams);

    if (this.state.loadingInitial) return <LoadingComponent />;
    return (
      <Grid>
        <Grid.Column width={10}>
          <div ref={this.contextRef}>
            <ScreamList
              loading={loading}
              screams={loadedScreams}
              moreScreams={moreScreams}
              getNextScreams={this.getNextScreams}
            />
          </div>
        </Grid.Column>
        <Grid.Column width={6}>
          <ScreamSidebar activities={activities} contextRef={this.contextRef} />
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loading} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapState,
  actions
)(firestoreConnect(query)(ScreamDashboard));
