/* eslint react/prop-types: 0 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@material-ui/core';

import ImageUploader from 'react-images-upload';
import { useForm } from 'react-hook-form';

import utils from '../../../utils';

import CommonButton from '../../common/CommonButton/CommonButton';
import styles from './PostForm.module.scss';

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
    <div className={styles.root}>
      <form onSubmit={validate(handleSubmit)} className={styles.form}>
        <TextField
          style={{ width: '200px', margin: '5px' }}
          {...register('title', { required: true, maxLength: 20 })}
          type='text'
          label='title'
          variant='outlined'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        {errors.title && <span>This field is required. Title can have up to 20 characters.</span>}
        <ImageUploader
          className={styles.imageUploader}
          withIcon={false}
          withPreview={true}
          buttonText="Choose images"
          onChange={handleImageUpload}
          imgExtension={['.jpg', '.gif', '.png']}
          maxFileSize={5242880}
          singleImage={true}
        />
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
        {errors.description && <span>This field is required. Description can have up to 300 characters.</span>}
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
        {errors.email && <span>Please enter a valid email</span>}
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
        {errors.price && <span>Price is required.</span>}
        <TextField
          style={{ width: '200px', margin: '5px' }}
          type='text'
          label='phone number'
          variant='outlined'
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
        />
        <TextField
          style={{ width: '200px', margin: '5px' }}
          type='text'
          label='city'
          variant='outlined'
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <div className={styles.buttons}>
          <CommonButton onClick={() => handleStatusChange('draft')} type="submit">
            Publish
          </CommonButton>
          <CommonButton onClick={() => handleStatusChange('draft')} type="submit">
            Save as draft
          </CommonButton>
        </div>
      </form>
    </div>
  );
};

PostForm.propTypes = {
  action: PropTypes.func.isRequired,
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
