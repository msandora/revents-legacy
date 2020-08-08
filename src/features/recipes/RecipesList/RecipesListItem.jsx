import React, { Component } from 'react';
import { Segment, Item, Button, Popup, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class RecipesListItem extends Component {
  render() {
    const { recipe, deleteRecipe } = this.props;
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size='tiny' circular src={recipe.hostPhotoURL} />
              <Item.Content>
                <Item.Header as={Link} to={`/recipes/${recipe.id}`}>
                  {recipe.hostedBy}
                </Item.Header>
                <Item.Description>{recipe.date}</Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span style={{ whiteSpace: 'pre-wrap' }}>{recipe.body}</span>
        </Segment>
        <Segment attached clearing>
          <Popup
            content='Like'
            trigger={
              <Button as='div' labelPosition='right'>
                <Button icon>
                  <Icon name='heart' />
                </Button>
                <Label as='div' basic pointing='left'>
                  24
                </Label>
              </Button>
            }
          />
          <Popup
            content='Comments'
            trigger={
              <Button
                labelPosition='right'
                as={Link}
                to={`/recipes/${recipe.id}`}
              >
                <Button icon>
                  <Icon name='comments outline' />
                </Button>
                <Label as='div' basic pointing='left'>
                  5
                </Label>
              </Button>
            }
          />

          <Popup
            content='Delete'
            trigger={
              <Button
                floated='right'
                icon
                onClick={() => deleteRecipe(recipe.id)}
                as='a'
                color='red'
              >
                <Icon name='trash' />
              </Button>
            }
          />
          <Popup
            content='Manage'
            trigger={
              <Button
                floated='right'
                icon
                as={Link}
                to={`/manageRecipe/${recipe.id}`}
              >
                <Icon name='edit' />
              </Button>
            }
          />
        </Segment>
      </Segment.Group>
    );
  }
}

export default RecipesListItem;
