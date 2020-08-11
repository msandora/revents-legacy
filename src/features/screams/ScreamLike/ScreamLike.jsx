import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../screamActions';
import { Popup, Button, Icon, Label } from 'semantic-ui-react';

const mapState = (state) => ({
  user: state.user,
  auth: state.firebase.auth,
});

const actions = {
  likeScream,
  unlikeScream,
};

class ScreamLike extends Component {
  likedScream = () => {
    // if (
    //   this.props.user.likes &&
    //   this.props.user.likes.find(
    //     (like) => like.screamId === this.props.screamId
    //   )
    // )
    return true;
    // else return false;
  };
  likeScream = () => {
    alert('LIKE');
    this.props.likeScream(this.props.screamId);
  };
  unlikeScream = () => {
    alert('UNLIKE');
    this.props.unlikeScream(this.props.screamId);
  };
  render() {
    const { auth } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;

    // const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to='/login'>
        <Popup
          content='Like'
          trigger={
            <Button as='div' color='blue' labelPosition='right'>
              <Button icon>
                <Icon name='heart' />
              </Button>
              <Label as='div' basic pointing='left'>
                Not logged in
              </Label>
            </Button>
          }
        />
      </Link>
    ) : this.likedScream() ? (
      <Popup
        content='Undo like'
        trigger={
          <Button as='div' labelPosition='right' onClick={this.unlikeScream}>
            <Button icon>
              <Icon name='heart' color='red' />
            </Button>
            <Label as='div' basic pointing='left'>
              logged in 2
            </Label>
          </Button>
        }
      />
    ) : (
      <Popup
        content='Like'
        trigger={
          <Button as='div' labelPosition='right' onClick={this.likeScream}>
            <Button icon>
              <Icon name='heart' />
            </Button>
            <Label as='div' basic pointing='left'>
              3
            </Label>
          </Button>
        }
      />
    );
    return likeButton;
  }
}

export default connect(mapState, actions)(ScreamLike);
