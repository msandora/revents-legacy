import React, { Component } from 'react';
import { Button, Icon, Modal, Popup, Label, Grid } from 'semantic-ui-react';
import ScreamDetailsHeader from './ScreamDetailsHeader';
import ScreamDetailsInfo from './ScreamDetailsInfo';
import ScreamDetailsCarousel from './ScreamDetailsCarousel';
import { Link } from 'react-router-dom';

class ScreamDetailsDialog extends Component {
  render() {
    const { scream, isHost } = this.props;
    console.log('id', scream.id);
    return (
      <Modal
        closeIcon
        // open={open}
        trigger={
          <Link
            key={scream.id}
            to={{
              pathname: `/screams/${scream.id}`,
            }}
          >
            <Button color='teal' content='Open Modal' icon />
          </Link>
        }
      >
        <Modal.Header>
          <ScreamDetailsHeader scream={scream} />
        </Modal.Header>
        <Modal.Content>
          <Grid>
            <Grid.Column width={10}>
              <ScreamDetailsCarousel scream={scream} />
            </Grid.Column>
            <Grid.Column width={6}>
              <ScreamDetailsInfo scream={scream} />
              <ScreamDetailsInfo scream={scream} />
            </Grid.Column>
          </Grid>
        </Modal.Content>
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
      </Modal>
    );
  }
}

export default ScreamDetailsDialog;
