import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import TextArea from '../../../app/common/form/TextArea';

class ScreamDetailedChatForm extends Component {
  handleCommentSubmit = (values) => {
    const {
      addScreamComment,
      reset,
      screamId,
      closeForm,
      parentId,
    } = this.props;
    addScreamComment(screamId, values, parentId);
    reset();
    if (parentId !== 0) {
      closeForm();
    }
  };

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.handleCommentSubmit)}>
        <Field name='comment' type='text' component={TextArea} rows={2} />
        <Button content='Add Reply' labelPosition='left' icon='edit' primary />
      </Form>
    );
  }
}

export default reduxForm({ Fields: 'comment' })(ScreamDetailedChatForm);
