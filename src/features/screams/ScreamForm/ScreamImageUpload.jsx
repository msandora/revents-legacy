import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Image, Header, Grid, Button } from 'semantic-ui-react';
import DropzoneInput from '../../user/Settings/Photos/DropzoneInput';
import CropperInput from '../../user/Settings/Photos/CropperInput';
import { uploadScreamImage } from '../screamActions';
import { toastr } from 'react-redux-toastr';

const query = ({ auth }) => {
  return [
    {
      collection: 'screams',
      doc: auth.uid,
      subcollections: [{ collection: 'photos' }],
      storeAs: 'photos',
    },
  ];
};

const actions = {
  uploadScreamImage,
};

const mapState = (state) => ({
  auth: state.firebase.auth, // whats the state?
  // scream: state.scream?
  photos: state.firestore.ordered.photos,
  loading: state.async.loading,
});

const ScreamImageUpload = ({ uploadScreamImage, photos, scream, loading }) => {
  const [files, setFiles] = useState([]);
  const [cropResult, setCropResult] = useState('');
  const [image, setImage] = useState(null);
  // console.log('scream.id', scream.id);
  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
      URL.revokeObjectURL(cropResult);
    };
  }, [files, cropResult]);

  const handleUploadImage = async () => {
    try {
      await uploadScreamImage(image, files[0].name, scream.id);
      handleCancelCrop();
      toastr.success('Success', 'Photo has been uploaded');
    } catch (error) {
      toastr.error('Oops', 'Something went wrong');
    }
  };

  const handleCancelCrop = () => {
    setFiles([]);
    setImage(null);
    setCropResult('');
  };

  return (
    <Grid>
      <Grid.Row />
      <Grid.Column width={4}>
        <Header color='teal' sub content='Step 1 - Add Photo' />
        <DropzoneInput setFiles={setFiles} />
      </Grid.Column>
      <Grid.Column width={5}>
        <Header sub color='teal' content='Step 2 - Resize image' />
        {files.length > 0 && (
          <CropperInput
            imagePreview={files[0].preview}
            setCropResult={setCropResult}
            setImage={setImage}
          />
        )}
      </Grid.Column>
      <Grid.Column width={5}>
        <Header sub color='teal' content='Step 3 - Preview & Upload' />
        {files.length > 0 && (
          <Fragment>
            <Image
              src={cropResult}
              style={{ minHeight: '200px', minWidth: '200px' }}
            />
            <Button.Group>
              <Button
                onClick={handleUploadImage}
                loading={loading}
                style={{ width: '100px' }}
                positive
                icon='check'
              />
              <Button
                disabled={loading}
                onClick={handleCancelCrop}
                style={{ width: '100px' }}
                icon='close'
              />
            </Button.Group>
          </Fragment>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default compose(
  connect(mapState, actions),
  firestoreConnect((auth) => query(auth))
)(ScreamImageUpload);
