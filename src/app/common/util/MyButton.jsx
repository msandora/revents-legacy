import React from 'react';
import { Button, Popup } from 'semantic-ui-react';

export default ({ children, onClick, tip, type, floated, icon, color }) => {
  console.log(icon);

  return (
    <Popup
      content={tip}
      trigger={
        <Button
          color={color}
          type={type}
          floated={floated}
          icon
          as='div'
          onClick={onClick}
        >
          {children}
        </Button>
      }
    />
  );
};
