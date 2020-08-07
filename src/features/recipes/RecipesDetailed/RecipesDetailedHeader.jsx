import React from 'react';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import {
  imageStyle,
  imageTextStyle,
} from '../../../app/common/styles/DetailedHeader';

const RecipesDetailedHeader = ({ recipe }) => {
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image
          src={`/assets/categoryImages/${recipe.category}.jpg`}
          fluid
          style={imageStyle}
        />

        <Segment basic style={imageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={recipe.title}
                  style={{ color: 'white' }}
                />
                {/* <p>{recipe.date}</p> */}
                <p>
                  Shared by <strong>{recipe.hostedBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached='bottom' clearing>
        <Button color='teal'>Manage Recipe</Button>
      </Segment>
    </Segment.Group>
  );
};

export default RecipesDetailedHeader;
