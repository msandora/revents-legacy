import React, { Fragment, Component } from 'react';
import { Segment, Header, Comment } from 'semantic-ui-react';
import ScreamDetailedChatForm from './ScreamDetailedChatForm';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';

class ScreamDetailedChat extends Component {
  state = {
    showReplyForm: false,
    selectedCommentId: null,
  };

  handleOpenReplyForm = (id) => () => {
    this.setState({
      showReplyForm: true,
      selectedCommentId: id,
    });
  };

  handleCloseReplyForm = () => {
    this.setState({
      selectedCommentId: null,
      showReplyForm: false,
    });
  };

  render() {
    const { addScreamComment, screamId, screamChat } = this.props;
    const { showReplyForm, selectedCommentId } = this.state;
    return (
      <Fragment>
        <Segment
          textAlign='center'
          attached='top'
          inverted
          color='teal'
          style={{ border: 'none' }}
        >
          <Header>Chat about this</Header>
        </Segment>

        <Segment attached>
          <Comment.Group>
            {screamChat &&
              screamChat.map((comment) => (
                <Comment key={comment.id}>
                  <Comment.Avatar
                    src={comment.photoURL || '/assets/user.png'}
                  />
                  <Comment.Content>
                    <Comment.Author as={Link} to={`/profile/${comment.uid}`}>
                      {comment.displayName}
                    </Comment.Author>
                    <Comment.Metadata>
                      <div>{formatDistance(comment.date, Date.now())} ago</div>
                    </Comment.Metadata>
                    <Comment.Text style={{ whiteSpace: 'pre-wrap' }}>
                      {comment.text}
                    </Comment.Text>
                    <Comment.Actions>
                      <Comment.Action
                        onClick={this.handleOpenReplyForm(comment.id)}
                      >
                        Reply
                      </Comment.Action>
                      {showReplyForm && selectedCommentId === comment.id && (
                        <ScreamDetailedChatForm
                          addScreamComment={addScreamComment}
                          screamId={screamId}
                          form={`reply_${comment.id}`}
                          closeForm={this.handleCloseReplyForm}
                          parentId={comment.id}
                        />
                      )}
                    </Comment.Actions>
                  </Comment.Content>

                  {comment.childNodes &&
                    comment.childNodes.map((child) => (
                      <Comment.Group key={child.id}>
                        <Comment>
                          <Comment.Avatar
                            src={child.photoURL || '/assets/user.png'}
                          />
                          <Comment.Content>
                            <Comment.Author
                              as={Link}
                              to={`/profile/${child.uid}`}
                            >
                              {child.displayName}
                            </Comment.Author>
                            <Comment.Metadata>
                              <div>
                                {formatDistance(child.date, Date.now())} ago
                              </div>
                            </Comment.Metadata>
                            <Comment.Text style={{ whiteSpace: 'pre-wrap' }}>
                              {child.text}
                            </Comment.Text>
                            <Comment.Actions>
                              <Comment.Action
                                onClick={this.handleOpenReplyForm(child.id)}
                              >
                                Reply
                              </Comment.Action>
                              {showReplyForm &&
                                selectedCommentId === child.id && (
                                  <ScreamDetailedChatForm
                                    addScreamComment={addScreamComment}
                                    screamId={screamId}
                                    form={`reply_${child.id}`}
                                    closeForm={this.handleCloseReplyForm}
                                    parentId={child.parentId}
                                  />
                                )}
                            </Comment.Actions>
                          </Comment.Content>
                        </Comment>
                      </Comment.Group>
                    ))}
                </Comment>
              ))}
          </Comment.Group>
          <ScreamDetailedChatForm
            addScreamComment={addScreamComment}
            screamId={screamId}
            form={'newComment'}
            parentId={0}
          />
        </Segment>
      </Fragment>
    );
  }
}

export default ScreamDetailedChat;
