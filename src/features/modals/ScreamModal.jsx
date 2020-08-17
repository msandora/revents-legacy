import React from 'react';
import {
  Button,
  Icon,
  Modal,
  Popup,
  Label,
  Grid,
  Segment,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { closeModal } from './modalActions';
import ScreamDetailsInfo from '../screams/ScreamDetails/ScreamDetailsInfo';
import ScreamDetailsHeader from '../screams/ScreamDetails/ScreamDetailsHeader';
import ScreamDetailsCarousel from '../screams/ScreamDetails/ScreamDetailsCarousel';

const actions = {
  closeModal,
};

const ScreamModal = ({ closeModal, scream }) => {
  // console.log(scream);
  return (
    <Modal
      centered={false}
      closeIcon
      open={true}
      onClose={closeModal}
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
        <Segment>
          <Popup
            content='Like'
            trigger={
              <Button as='div' labelPosition='right'>
                <Button icon>
                  <Icon name='heart' />
                </Button>
                <Label as='a' basic pointing='left'>
                  {scream.likeCount}
                </Label>
              </Button>
            }
          />
        </Segment>
      }
    />
  );
};

export default connect(null, actions)(ScreamModal);
