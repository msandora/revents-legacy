import React, { Component, Fragment } from 'react';
import ScreamListItem from './ScreamListItem';

class ScreamList extends Component {
  render() {
    const { screams, deleteScream } = this.props;
    return (
      <Fragment>
        {screams.map((scream) => (
          <ScreamListItem
            key={scream.id}
            scream={scream}
            deleteScream={deleteScream}
          />
        ))}
      </Fragment>
    );
  }
}

export default ScreamList;
