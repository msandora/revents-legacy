import React, { Component, Fragment } from 'react';
import ScreamListItem from './ScreamListItem';

class ScreamList extends Component {
  render() {
    const { screams, selectScream, deleteScream } = this.props;
    return (
      <Fragment>
        {screams.map((scream) => (
          <ScreamListItem
            key={scream.id}
            scream={scream}
            selectScream={selectScream}
            deleteScream={deleteScream}
          />
        ))}
      </Fragment>
    );
  }
}

export default ScreamList;
