import React from 'react';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';

const recipeImageStyle = {
  filter: 'brightness(30%)',
};

const recipeImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '2%',
  width: '100%',
  height: 'auto',
  color: 'white',
};

const RecipesDetailedHeader = ({ recipe }) => {
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image
          src={`/assets/categoryImages/${recipe.category}.jpg`}
          fluid
          style={recipeImageStyle}
        />

        <Segment basic style={recipeImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={recipe.title}
                  style={{ color: 'white' }}
                />
                <p>{recipe.date}</p>
                <p>
                  Hosted by <strong>{recipe.hostedBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached='bottom'>
        <Button>Cancel My Place</Button>
        <Button color='teal'>JOIN THIS EVENT</Button>

        <Button color='orange' floated='right'>
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  );
};

export default RecipesDetailedHeader;
