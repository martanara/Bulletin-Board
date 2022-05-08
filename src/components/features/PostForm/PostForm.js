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
  const [text, setDescription] = useState(props.text || '');
  const [author, setAuthor] = useState(props.author || '');
  const [image, setImage] = useState(props.image || '');
  const [status, setStatus] = useState('draft');
  const [price, setPrice] = useState(props.price || '');
  const [phone, setPhoneNumber] = useState(props.phone || '');
  const [location, setLocation] = useState(props.location || '');

  const created = props.created || utils.dateToStr(new Date());
  const updated = utils.dateToStr(new Date());

  const handleImageUpload = (files) => {
    setImage(files[0]);
  };

  const handleStatusChange = (status) => {
    setStatus(status);
  };

  const handleSubmit = () => {
    const post = { title, text, created, updated, author, status, image, price, phone, location };
    const formData = new FormData();

    for(let key of ['title', 'text', 'created', 'updated','author', 'status', 'image', 'price', 'phone', 'location']) {
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
        {errors.text && <span>This field is required. text can have up to 300 characters.</span>}
        <TextField
          style={{ width: '200px', margin: '5px' }}
          {...register('author', { required: true, pattern: /^\S+@\S+\.\S+$/ })}
          required
          type='text'
          label='email'
          variant='outlined'
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
        {errors.author && <span>Please enter a valid author</span>}
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
          value={phone}
          onChange={e => setPhoneNumber(e.target.value)}
        />
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
  props: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    updated: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    image: PropTypes.string,
    price: PropTypes.string,
    phone: PropTypes.string,
    location: PropTypes.string,
  }),
};

export default PostForm;
