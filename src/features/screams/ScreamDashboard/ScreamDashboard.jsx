import React from 'react';
import { Grid } from 'semantic-ui-react';
import ScreamActivity from '../ScreamActivity/ScreamActivity';
import ScreamList from '../ScreamList/ScreamList';
import ScreamSidebar from '../ScreamSidebar/ScreamSidebar';

const ScreamDashboard = () => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ScreamList />
      </Grid.Column>
      <Grid.Column width={6}>
        <ScreamSidebar/>
        <ScreamActivity />
      </Grid.Column>
    </Grid>
  );
};

export default ScreamDashboard;


// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Grid, Loader } from 'semantic-ui-react';
// import ScreamList from '../ScreamList/ScreamList';
// import { getScreamsForDashboard } from '../screamActions';
// import LoadingComponent from '../../../app/layout/LoadingComponent';
// import ScreamActivity from '../ScreamActivity/ScreamActivity';
// import { firestoreConnect } from 'react-redux-firebase';

// const mapState = (state) => ({
//   screams: state.screams,
//   loading: state.async.loading,
// });

// const actions = {
//   getScreamsForDashboard,
// };

// class ScreamsDashboard extends Component {
//   state = {
//     moreScreams: false,
//     loadingInitial: true,
//     loadedScreams: [],
//   };

//   async componentDidMount() {
//     let next = await this.props.getScreamsForDashboard();
//     console.log(next);

//     if (next && next.docs && next.docs.length > 1) {
//       this.setState({
//         moreScreams: true,
//         loadingInitial: false,
//       });
//     }
//   }

//   componentDidUpdate = (prevProps) => {
//     if (this.props.screams !== prevProps.screams) {
//       this.setState({
//         loadedScreams: [...this.state.loadedScreams, ...this.props.screams],
//       });
//     }
//   };

//   getNextScreams = async () => {
//     const { screams } = this.props;
//     let lastScream = screams && screams[screams.length - 1];
//     // console.log(lastScream);
//     let next = await this.props.getScreamsForDashboard(lastScream);
//     if (next && next.docs && next.docs.length <= 1) {
//       this.setState({
//         moreScreams: false,
//       });
//       console.log(next);
//     }
//   };

//   render() {
//     const { loading } = this.props;
//     const { moreScreams, loadedScreams } = this.state;
//     if (this.state.loadingInitial) return <LoadingComponent />;
//     return (
//       <Grid>
//         <Grid.Column width={10}>
//           <ScreamList
//             loading={loading}
//             screams={loadedScreams}
//             moreScreams={moreScreams}
//             getNextScreams={this.getNextScreams}
//           />
//         </Grid.Column>
//         <Grid.Column width={6}>
//           <ScreamActivity />
//         </Grid.Column>
//         <Grid.Column width={10}>
//           <Loader active={loading}/>
//         </Grid.Column>
//       </Grid>
//     );
//   }
// }

// export default connect(
//   mapState,
//   actions
// )(firestoreConnect([{ collection: 'screams' }])(ScreamsDashboard));

