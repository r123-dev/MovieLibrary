import React, { useEffect, useState, useContext } from 'react';
import { Card, Button, Form, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import {
  deletePostById,
  getPostsByTitle,
  insertPost,
  updatePostById,
} from '../../API';
import { UserContext } from '../../Hooks/userContext';
import { useForm } from '../../Hooks/useForm';

const Posts = ({ title }) => {
  const [comments, setComments] = useState([]);
  const { user } = useContext(UserContext);
  const [values, handleChange] = useForm({
    username: '',
    title: '',
    comment: '',
    updateComment: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPostsByTitle(title);
        return setComments(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [title]);

  const handleDeletePost = async (comment) => {
    try {
      await deletePostById(comment._id);
      setComments(comments.filter((item) => item._id != comment._id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewPost = async () => {
    try {
      const postObj = {
        username: user.username,
        title,
        comment: values.comment,
      };

      await insertPost(postObj);
      const updated = await getPostsByTitle(title);
      setComments(updated);
      values.comment = '';
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdatePost = async (commentId) => {
    try {
      await updatePostById(commentId, values.updateComment);
      values.updateComment = '';
      const updatedResults = await getPostsByTitle(title);
      return setComments(updatedResults);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {user.username && (
        <Row>
          <Card
            style={{
              width: '50%',
              margin: 'auto',
              marginTop: '1rem',
              minHeight: '11rem',
            }}
          >
            <Card.Body>
              <Card.Title>Post new comment</Card.Title>
              <Card.Text>
                <Form.Control
                  style={{ textAlign: 'center', height: '3rem' }}
                  name='comment'
                  placeholder='Comment'
                  value={values.comment}
                  onChange={handleChange}
                />
              </Card.Text>
              <Button
                variant='primary'
                type='submit'
                hidden={values.comment == ''}
                onClick={() => handleNewPost()}
              >
                Submit
              </Button>
            </Card.Body>
          </Card>
        </Row>
      )}

      {comments &&
        comments.map((comment, i) => {
          return (
            <Row
              className='row d-flex justify-content-center'
              style={{
                marginTop: '1rem',
              }}
              key={i}
            >
              <Card style={{ width: '50%', height: '10rem' }}>
                <Card.Body>
                  <Card.Title>
                    <pre>{`Post by: ${comment.username} @ ${new Date(
                      comment.createdAt,
                    ).toUTCString()}`}</pre>
                  </Card.Title>
                  <Card.Text>
                    <Form.Control
                      style={{ textAlign: 'center' }}
                      type='text'
                      name='updateComment'
                      disabled={user.username !== comment.username}
                      defaultValue={comment.post}
                      onChange={handleChange}
                      required
                    />
                  </Card.Text>
                  <Button
                    variant='danger'
                    hidden={user.username !== comment.username}
                    onClick={() => handleDeletePost(comment)}
                  >
                    Delete
                  </Button>
                  &nbsp;
                  <Button
                    variant='outline-success'
                    hidden={user.username !== comment.username}
                    onClick={() => handleUpdatePost(comment._id)}
                  >
                    Update
                  </Button>
                </Card.Body>
              </Card>
            </Row>
          );
        })}
    </>
  );
};

Posts.propTypes = {
  title: PropTypes.string,
};

export default Posts;
