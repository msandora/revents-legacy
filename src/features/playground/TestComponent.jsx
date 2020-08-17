import React, { Component } from 'react';
import { connect } from 'react-redux';
import { incrementAsync, decrementAsync } from './testActions';
import { Button, Header, Segment } from 'semantic-ui-react';
import { openModal } from '../modals/modalActions';
import TestPlaceInput from './TestPlaceInput';
import SimpleMap from './SimpleMap';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import firebase from '../../app/config/firebase';
import { toastr } from 'react-redux-toastr';
import ModalGalleryExample from './ModalGalleryExample';

// mapStateToProps
const mapState = (state) => ({
  data: state.test.data,
  loading: state.async.loading,
  buttonName: state.async.elementName,
});

// mapDispatchToProps
const actions = {
  incrementAsync,
  decrementAsync,
  openModal,
};

class TestComponent extends Component {
  state = {
    latlng: {
      lat: 59.95,
      lng: 30.33,
    },
  };

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        this.setState({
          latlng: latLng,
        });
      })
      .catch((error) => console.error('Error', error));
  };

  handleTestUpdateProfile = async () => {
    const firestore = firebase.firestore();
    // doc = diana's userUid
    let userDocRef = await firestore
      .collection('users')
      .doc('caAC64HkTmT7I7FroxMBXZGepB23');
    try {
      await userDocRef.update({ displayName: 'testing' });
      toastr.success('Success');
    } catch (error) {
      console.log(error);
      toastr.error('Computer says no');
    }
  };

  handleCreateTestEvent = async () => {
    const firestore = firebase.firestore();
    let eventDocRef = await firestore.collection('events').doc('DELETEME');
    try {
      await eventDocRef.set({
        title: 'DELETEME',
      });
      toastr.success('Success');
    } catch (error) {
      console.log(error);
      toastr.error('Computer says no');
    }
  };

  handleTestJoinEvent = async () => {
    const firestore = firebase.firestore();
    let eventDocRef = await firestore.collection('events').doc('DELETEME');
    const attendee = {
      photoURL: '/assets/user.png',
      displayName: 'Testing',
    };
    try {
      await eventDocRef.update({
        [`attendees.caAC64HkTmT7I7FroxMBXZGepB23`]: attendee,
      });
      toastr.success('Success');
    } catch (error) {
      console.log(error);
      toastr.error('Computer says no');
    }
  };

  handleTestCancelGoingToEvent = async () => {
    const firestore = firebase.firestore();
    let eventDocRef = await firestore.collection('events').doc('DELETEME');
    try {
      await eventDocRef.update({
        [`attendees.caAC64HkTmT7I7FroxMBXZGepB23`]: firebase.firestore.FieldValue.delete(),
      });
      toastr.success('Success');
    } catch (error) {
      console.log(error);
      toastr.error('Computer says no');
    }
  };

  handleTestChangeAttendeePhotoInEvent = async () => {
    const firestore = firebase.firestore();
    let eventDocRef = await firestore.collection('events').doc('DELETEME');
    try {
      await eventDocRef.update({
        [`attendees.caAC64HkTmT7I7FroxMBXZGepB23.photoURL`]: 'testing123.jpg',
      });
      toastr.success('Success');
    } catch (error) {
      console.log(error);
      toastr.error('Computer says no');
    }
  };

  render() {
    const {
      data,
      incrementAsync,
      decrementAsync,
      openModal,
      loading,
      buttonName,
    } = this.props;

    return (
      <div>
        <h1>Test Component</h1>

        <Segment>
          <ModalGalleryExample />
        </Segment>

        <h3>The answer is: {data}</h3>
        <Button
          onClick={(e) => console.log(e.target.name)}
          name='TEST'
          positive
          content='TEST'
        />
        <Button
          name='increment'
          loading={buttonName === 'increment' && loading}
          onClick={(e) => incrementAsync(e.target.name)}
          positive
          content='Increment'
        />
        <Button
          name='decrement'
          loading={buttonName === 'decrement' && loading}
          onClick={(e) => decrementAsync(e.target.name)}
          negative
          content='Decrement'
        />
        <Button
          onClick={() => openModal('TestModal', { data: 42 })}
          color='teal'
          content='Open Modal'
        />
        <br />
        <br />
        <Header as='h2' content='Permissions tests' />
        <Button
          onClick={this.handleCreateTestEvent}
          color='blue'
          fluid
          content='Test create event - should fail if anon'
        />
        <Button
          onClick={this.handleTestUpdateProfile}
          color='orange'
          fluid
          content='Test update dianas profile - should fail if anon/not diana - should succeed if diana'
        />
        <Button
          onClick={this.handleTestJoinEvent}
          color='olive'
          fluid
          content='Test joining an event - should fail if anon/not diana - should succeed if diana'
        />
        <Button
          onClick={this.handleTestCancelGoingToEvent}
          color='purple'
          fluid
          content='Test cancelling attendance to an event - should fail if anon/not diana - should succeed if diana'
        />
        <Button
          onClick={this.handleTestChangeAttendeePhotoInEvent}
          color='violet'
          fluid
          content='Test changing photo for event attendee - should fail if anon/not diana - should succeed if diana'
        />
        <br />
        <br />
        <TestPlaceInput selectAddress={this.handleSelect} />
        <SimpleMap key={this.state.latlng.lng} latlng={this.state.latlng} />
      </div>
    );
  }
}

export default connect(mapState, actions)(TestComponent);
