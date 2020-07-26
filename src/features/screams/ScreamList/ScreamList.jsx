import React, { Component, Fragment } from 'react';
import ScreamListItem from './ScreamListItem';

class ScreamList extends Component {
  render() {
    const { screams, selectScream } = this.props;
    return (
      <Fragment>
        {screams.map((scream) => (
          <ScreamListItem
            key={scream.id}
            scream={scream}
            selectScream={selectScream}
          />
        ))}
      </Fragment>
    );
  }
}

export default ScreamList;
