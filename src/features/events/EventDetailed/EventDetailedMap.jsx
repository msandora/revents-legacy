import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Icon, Segment } from 'semantic-ui-react';

const Marker = () => <Icon name='marker' size='big' color='red' />;

const EventDetailedMap = ({ lat, lng }) => {
  const zoom = 14;
  return (
    <Segment attached='bottom'>
      <div style={{ height: '300px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyC88SmqwsDak-40PVy7eovoALC0DVn0qF8' }}
          defaultCenter={(lat, lng)}
          defaultZoom={this.props.zoom}
        >
          <Marker lat={lat} lng={lng} />
        </GoogleMapReact>
      </div>
    </Segment>
  );
};

export default EventDetailedMap;
