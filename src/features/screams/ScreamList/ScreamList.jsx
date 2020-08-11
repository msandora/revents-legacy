import React, { Component, Fragment } from 'react';
import ScreamListItem from './ScreamListItem';
import InfiniteScroll from 'react-infinite-scroller';

class ScreamList extends Component {
  render() {
    const {
      screams,
      getNextScreams,
      loading,
      moreScreams,
      likes,
      isHost,
    } = this.props;

    return (
      <Fragment>
        {screams && screams.length !== 0 && (
          <InfiniteScroll
            pageStart={0}
            loadMore={getNextScreams}
            hasMore={!loading && moreScreams}
            initialLoad={false}
          >
            {screams &&
              screams.map((scream) => (
                <ScreamListItem
                  key={scream.id}
                  scream={scream}
                  isHost={isHost}
                  likes={likes}
                />
              ))}
          </InfiniteScroll>
        )}
      </Fragment>
    );
  }
}

export default ScreamList;
