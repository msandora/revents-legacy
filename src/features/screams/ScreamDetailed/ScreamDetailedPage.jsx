import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, SegmentGroup } from 'semantic-ui-react';
import ScreamDetailedHeader from './ScreamDetailedHeader';
import ScreamDetailedInfo from './ScreamDetailedInfo';
import ScreamDetailedChat from './ScreamDetailedChat';
import { withFirestore, firebaseConnect, isEmpty } from 'react-redux-firebase';
import { toastr } from 'react-redux-toastr';

const mapState = (state, ownProps) => {
  const screamId = ownProps.match.params.id;
  //Declare as empty object
  let scream = {};

  if (
    state.firestore.ordered.screams &&
    state.firestore.ordered.screams.length > 0
  ) {
    scream =
      state.firestore.ordered.screams.filter(
        (scream) => scream.id === screamId
      )[0] || {};
  }

  return {
    scream,
    // requesting: state.firestore.status.requesting,
    // loading: state.async.loading,
    // auth: state.firebase.auth,
    // screamChat:
    //   !isEmpty(state.firebase.data.scream_chat) && // If Chat is not empty
    //   objectToArray(state.firebase.data.scream_chat[ownProps.match.params.id]),
  };
};
class ScreamDetailedPage extends Component {
  async componentDidMount() {
    const { firestore, match, history } = this.props;
    let scream = await firestore.get(`screams/${match.params.id}`);
    if (!scream.exists) {
      history.push('/screams');
      toastr.error('Sorry', 'Scream not found');
    }
  }

  render() {
    const { scream } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <SegmentGroup>
            <ScreamDetailedHeader scream={scream} />
            <ScreamDetailedInfo scream={scream} />
          </SegmentGroup>
        </Grid.Column>
        <Grid.Column width={6}>
          <ScreamDetailedChat scream={scream} />
        </Grid.Column>
      </Grid>
    );
  }
}

// const ScreamDetailedPage = ({ scream }) => {
//   return (
//     <Grid>
//       <Grid.Column width={10}>
//         <SegmentGroup>
//           <ScreamDetailedHeader scream={scream} />
//           <ScreamDetailedInfo scream={scream} />
//         </SegmentGroup>
//       </Grid.Column>
//       <Grid.Column width={6}>
//         <ScreamDetailedChat scream={scream} />
//       </Grid.Column>
//     </Grid>
//   );
// };

export default withFirestore(connect(mapState)(ScreamDetailedPage));
