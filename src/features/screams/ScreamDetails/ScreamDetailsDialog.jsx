import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Icon, Modal, Popup, Label, Grid } from 'semantic-ui-react';
import ScreamDetailsHeader from './ScreamDetailsHeader';
import ScreamDetailsInfo from './ScreamDetailsInfo';
import ScreamDetailsCarousel from './ScreamDetailsCarousel';
import { Link, withRouter } from 'react-router-dom';
import { addScreamComment } from '../screamActions';
import { openModal } from '../../modals/modalActions';

const actions = {
  addScreamComment,
  openModal,
};

class ScreamDetailsDialog extends Component {
  render() {
    const { scream, isHost, openModal } = this.props;
    // console.log('id', scream.id);
    return (
      <Modal
        closeIcon
        onClose={() => {
          console.log('onClose');
          window.history.pushState({}, document.title, '/' + 'screams');

          // e.preventDefault();
          // this.props.history.push(`/screams/bar`);
          // window.history.replaceState(null, null, `screams/123`);
          // window.history.pushState('object or string', 'Title', `screams/123`);
        }}
        onOpen={() => {
          console.log('onOpen');
          // e.preventDefault();
          // this.props.history.push(`/screams/bar`);
          // window.history.replaceState(null, null, `screams/123`);
          window.history.pushState('object or string', 'Title', `screams/123`);
          // history.pushState({}, null, `screams/123`);
          openModal('ScreamModal', { scream });
          // console.log('CLICK', scream);
        }}
        trigger={
          // <Link
          //   key={scream.id}
          //   to={{
          //     pathname: `/screams/${scream.id}`,
          //   }}
          // >
          <Button color='teal' content='Open ScreamDetailsModal' icon />
          // </Link>
        }
        header={<ScreamDetailsHeader scream={scream} />}
        content={
          <Modal.Content>
            <Grid>
              <Grid.Column width={10}>
                <ScreamDetailsCarousel scream={scream} />
              </Grid.Column>
              <Grid.Column width={6}>
                <ScreamDetailsInfo scream={scream} />
              </Grid.Column>
            </Grid>
          </Modal.Content>
        }
        actions={
          <Modal.Actions>
            <Popup
              content='Like'
              trigger={
                <Button as='div' labelPosition='right'>
                  <Button icon>
                    <Icon name='heart' />
                  </Button>
                  <Label as='a' basic pointing='left'>
                    24
                  </Label>
                </Button>
              }
            />
            {isHost && (
              <Popup
                content='Manage'
                trigger={
                  <Button
                    icon
                    as={Link}
                    floated='right'
                    to={`/manageScream/${scream.id}`}
                  >
                    <Icon name='edit' />
                  </Button>
                }
              />
            )}
          </Modal.Actions>
        }
      />
    );
  }
}

export default withRouter(connect(null, actions)(ScreamDetailsDialog));
