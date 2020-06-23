import React, { Component } from 'react';
import { Segment, Item, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class ScreamListItem extends Component {
  render() {
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size='tiny' circular src='/assets/user.png' />
              <Item.Content>
                <Item.Header as={Link} to=''>
                  Title
                </Item.Header>
                <Item.Description>
                  Hosted by
                  <Link as={Link} to=''>
                    Host
                  </Link>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span style={{ whiteSpace: 'pre-wrap' }}>description</span>
        </Segment>
        <Segment clearing>
          <Button
            onClick={() => console.log('click')}
            as='a'
            color='red'
            floated='right'
            content='Delete'
          />
          <Button as={Link} to='' color='teal' floated='right' content='View' />
        </Segment>
      </Segment.Group>
    );
  }
}

export default ScreamListItem;
