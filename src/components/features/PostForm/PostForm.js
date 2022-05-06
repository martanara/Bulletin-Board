/* eslint react/prop-types: 0 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Typography, TextField, Button } from '@material-ui/core';

import ImageUploader from 'react-images-upload';
import { useForm } from 'react-hook-form';

import utils from '../../../utils';

const PostForm = (props) => {

  const { register, handleSubmit: validate, formState: { errors } } = useForm();

  const [title, setTitle] = useState(props.title || '');
  const [description, setDescription] = useState(props.description || '');
  const [email, setEmail] = useState(props.email || '');
  const [image, setImage] = useState(props.image || '');
  const [status, setStatus] = useState('draft');
  const [price, setPrice] = useState(props.price || '');
  const [phoneNumber, setPhoneNumber] = useState(props.phoneNumber || '');
  const [city, setCity] = useState(props.city || '');

  const publishedDate = props.publishedDate || utils.dateToStr(new Date());
  const editedDate = utils.dateToStr(new Date());

  const handleImageUpload = (files) => {
    setImage(files[0].name);
  };

  const handleStatusChange = (status) => {
    setStatus(status);
  };

  const handleSubmit = e => {
    props.action({ title, description, publishedDate, editedDate, email, status, image, price, phoneNumber, city });
  };

  return (
    <div>
      <Typography variant='h5'>{props.actionText} form</Typography>
      <form onSubmit={validate(handleSubmit)}>
        <TextField
          style={{ width: '200px', margin: '5px' }}
          {...register('title', { required: true, maxLength: 20 })}
          type='text'
          label='title'
          variant='outlined'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <br />
        {errors.title && <span>This field is required. Title can have up to 20 characters.</span>}
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
          {...register('description', { required: true, maxLength: 300 })}
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
        {errors.description && <span>This field is required. Description can have up to 300 characters.</span>}
        <br />
        <TextField
          style={{ width: '200px', margin: '5px' }}
          {...register('email', { required: true, pattern: /^\S+@\S+\.\S+$/ })}
          required
          type='text'
          label='email'
          variant='outlined'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <br />
        {errors.email && <span>Please enter a valid email</span>}
        <br />
        <TextField
          style={{ width: '200px', margin: '5px' }}
          {...register('price', { required: true, min: 1 })}
          required
          type='text'
          label='price'
          variant='outlined'
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <br />
        {errors.price && <span>Price is required.</span>}
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
          {props.actionText}
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
