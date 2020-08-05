import React, { Component } from 'react';
import { Segment, Item, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class RecipesListItem extends Component {
  render() {
    const { recipe, selectRecipe, deleteRecipe } = this.props;
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size='tiny' circular src={recipe.hostPhotoURL} />
              <Item.Content>
                <Item.Header as={Link} to={`/recipes/${recipe.id}`}>
                  {recipe.title}
                </Item.Header>
                <Item.Description>{recipe.date}</Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span style={{ whiteSpace: 'pre-wrap' }}>{recipe.ingredients}</span>
          <br />
          <span style={{ whiteSpace: 'pre-wrap' }}>{recipe.body}</span>
        </Segment>
        <Segment clearing>
          <Button
            onClick={() => deleteRecipe(recipe.id)}
            as='a'
            color='red'
            floated='right'
            content='Delete'
          />
          <Button
            onClick={() => selectRecipe(recipe)}
            as='a'
            // to={`/recipes/${recipe.id}`}
            color='teal'
            floated='right'
            content='View'
          />
        </Segment>
      </Segment.Group>
    );
  }
}

export default RecipesListItem;
