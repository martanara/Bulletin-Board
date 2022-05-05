/* eslint react/prop-types: 0 */

import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import utils from '../../../utils';
import ImageUploader from 'react-images-upload';

const PostForm = ({action, actionText, ...props}) => {

  const [title, setTitle] = useState(props.title || '');
  const [description, setDescription] = useState(props.description || '');
  // eslint-disable-next-line
  const [publishedDate, setPublishedDate] = useState(props.publishedDate || utils.dateToStr(new Date()));
  // eslint-disable-next-line
  const [editedDate, setEditedDateDate] = useState(utils.dateToStr(new Date()));
  const [email, setEmail] = useState(props.email || '');
  const [image, setImage] = useState(props.image || '');
  // eslint-disable-next-line
  const [status, setStatus] = useState('draft');
  const [price, setPrice] = useState(props.price || '');
  const [phoneNumber, setPhoneNumber] = useState(props.phoneNumber || '');
  const [city, setCity] = useState(props.city || '');

  const handleImageUpload = (files) => {
    setImage(files[0].name);
  };

  const handleStatusChange = status => {
    setStatus(status);
  };

  const handleSubmit = e => {
    e.preventDefault();
    action({ title, description, publishedDate, editedDate, email, status, image, price, phoneNumber, city });
  };

  return (
    <div>
      <Typography variant='h5'>{actionText} form</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          style={{ width: '200px', margin: '5px' }}
          required
          type='text'
          label='title'
          variant='outlined'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <br />
        <ImageUploader
          withIcon={false}
          withPreview={true}
          buttonText="Choose images"
          onChange={handleImageUpload}
          imgExtension={['.jpg', '.gif', '.png']}
          maxFileSize={5242880}
          singleImage={true}
        />
        <br/>
        <TextField
          style={{ width: '400px', margin: '5px' }}
          required
          type='text'
          multiline
          rows={5}
          label='description'
          variant='outlined'
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <br />
        <TextField
          style={{ width: '200px', margin: '5px' }}
          required
          type='text'
          label='email'
          variant='outlined'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <br />
        <TextField
          style={{ width: '200px', margin: '5px' }}
          required
          type='text'
          label='price'
          variant='outlined'
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <br />
        <TextField
          style={{ width: '200px', margin: '5px' }}
          type='text'
          label='phone number'
          variant='outlined'
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
        />
        <br />
        <TextField
          style={{ width: '200px', margin: '5px' }}
          type='text'
          label='city'
          variant='outlined'
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <br />
        <Button variant='contained' onClick={() => handleStatusChange('published')} color='primary' type="submit">
          {actionText}
        </Button>
        <Button variant='contained' onClick={() => handleStatusChange('draft')} color='primary' type="submit">
          Save as draft
        </Button>
      </form>
    </div>
  );
};

PostForm.propTypes = {
  action: PropTypes.func.isRequired,
  actionText: PropTypes.string.isRequired,
  props: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    publishedDate: PropTypes.string.isRequired,
    editedDate: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    image: PropTypes.string,
    price: PropTypes.string,
    phoneNumber: PropTypes.string,
    city: PropTypes.string,
  }),
};

export default PostForm;
