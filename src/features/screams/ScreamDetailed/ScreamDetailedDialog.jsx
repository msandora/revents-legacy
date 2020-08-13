import React from 'react';
import {
  Button,
  Icon,
  Modal,
  Item,
  Popup,
  Label,
  Grid,
} from 'semantic-ui-react';
import ScreamDetailedInfo from './ScreamDetailedInfo';
import { Link } from 'react-router-dom';

const ScreamDetailedDialog = ({ scream, isHost, auth }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      closeIcon
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={
        <Button
          onClick={() => console.log('click')}
          color='teal'
          content='Open Modal'
          icon
        />
      }
    >
      <Modal.Header>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' circular src={scream.hostPhotoURL} />
            <Item.Content>
              <Item.Header as={Link} to={`/screams/${scream.id}`}>
                {scream.hostedBy}
              </Item.Header>
              <Item.Description>{scream.date}</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Modal.Header>
      <Modal.Content>
        <Grid>
          <Grid.Column width={10}>
            <ScreamDetailedInfo scream={scream} />
          </Grid.Column>
          <Grid.Column width={6}>Chat</Grid.Column>
        </Grid>
        {/* <ScreamDetailedInfo scream={scream} isHost={isHost} /> */}
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
};

export default ScreamDetailedDialog;
