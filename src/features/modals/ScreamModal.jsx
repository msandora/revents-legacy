import React, { Component } from 'react';
import { Modal, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { closeModal } from '../modals/modalActions';

const actions = { closeModal };

class ScreamModal extends Component {
  render() {
    return (
      <Modal size='mini' open={true} onClose={this.props.closeModal}>
        <Modal.Header>Scream Modal</Modal.Header>
        <Modal.Content>
          <Grid>
            <Grid.Column width={10}></Grid.Column>
            <Grid.Column width={6}>test</Grid.Column>
          </Grid>
        </Modal.Content>
      </Modal>
    );
  }
}

export default connect(null, actions)(ScreamModal);
