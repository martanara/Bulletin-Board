import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import { getLoggedUser } from '../../redux/usersRedux';

import { TextField } from '@material-ui/core';

import ImageUploader from 'react-images-upload';
import { useForm } from 'react-hook-form';

import CommonButton from '../CommonButton/CommonButton';

import styles from './PostForm.module.scss';

import PropTypes from 'prop-types';

const PostForm = (props) => {
  const { register, handleSubmit: validate, formState: { errors } } = useForm();

  const loggedInUser = useSelector(state => getLoggedUser(state));

  const [title, setTitle] = useState(props.title || '');
  const [text, setDescription] = useState(props.text || '');
  const [image, setImage] = useState(props.image || '');
  const [status, setStatus] = useState('draft');
  const [price, setPrice] = useState(props.price || '');
  const [phone, setPhoneNumber] = useState(props.phone || '');
  const [location, setLocation] = useState(props.location || '');

  const created = props.created || new Date();
  const isUpdated = () => props.actionText === 'edit' ? new Date() : undefined;
  const updated = isUpdated();
  const email = loggedInUser.email;

  const handleImageUpload = (files) => {
    setImage(files[0]);
  };

  const handleStatusChange = (status) => {
    setStatus(status);
  };

  const handleSubmit = () => {
    const post = { title, text, created, updated, email, status, image, price, phone, location };
    const formData = new FormData();

    for(let key of ['title', 'text', 'created', 'updated','email', 'status', 'image', 'price', 'phone', 'location']) {
      formData.append(key, post[key]);
    }
    props.action(formData);
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
        {errors.title && <span className={styles.error}>This field is required. Title can have up to 20 characters.</span>}
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
          {...register('text', { required: true, maxLength: 300 })}
          required
          type='text'
          multiline
          minRows={5}
          label='text'
          variant='outlined'
          value={text}
          onChange={e => setDescription(e.target.value)}
        />
        {errors.text && <span className={styles.error}>This field is required. text can have up to 300 characters.</span>}
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
        {errors.price && <span className={styles.error}>Price is required.</span>}
        <TextField
          {...register('phone', {required: true, max: 11, min: 11, maxLength: 11, pattern: /111-222-333/i})}
          style={{ width: '200px', margin: '5px' }}
          type='text'
          label='phone number'
          variant='outlined'
          value={phone}
          placeholder='111-222-333'
          onChange={e => setPhoneNumber(e.target.value)}
        />
        {errors.phone && <span className={styles.error}>Please enter phone number in the correct format.</span>}
        <TextField
          style={{ width: '200px', margin: '5px' }}
          type='text'
          label='location'
          variant='outlined'
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
        <div className={styles.buttons}>
          <CommonButton onClick={() => handleStatusChange('published')} type="submit">
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
  actionText: PropTypes.string.isRequired,
  title: PropTypes.string,
  text: PropTypes.string,
  created: PropTypes.string,
  updated: PropTypes.string,
  status: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.string,
  phone: PropTypes.string,
  location: PropTypes.string,
};

export default PostForm;
