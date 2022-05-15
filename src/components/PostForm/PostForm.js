import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import { getLoggedUser } from '../../redux/usersRedux';
import { getIsLoading } from '../../redux/postsRedux';

import { TextField, Button } from '@material-ui/core';

import ImageUploader from 'react-images-upload';
import { useForm } from 'react-hook-form';

import CommonButton from '../CommonButton/CommonButton';
import Spinner from '../Spinner/Spinner';

import styles from './PostForm.module.scss';

import PropTypes from 'prop-types';

const PostForm = (props) => {
  // Form validation
  const { register, handleSubmit: validate, formState: { errors } } = useForm();

  // Check for logged in user
  const loggedInUser = useSelector(state => getLoggedUser(state));

  // Get the load & error state
  const load = useSelector(state => getIsLoading(state));

  // Post details
  const [title, setTitle] = useState(props.title || '');
  const [text, setDescription] = useState(props.text || '');
  const [status, setStatus] = useState('draft');
  const [price, setPrice] = useState(props.price || '');
  const [phone, setPhoneNumber] = useState(props.phone || '');
  const [location, setLocation] = useState(props.location || '');

  const created = props.created || new Date();
  const isUpdated = () => props.actionText === 'edit' ? new Date() : undefined;
  const updated = isUpdated();
  const email = loggedInUser.email;

  // Image handling
  const uploadPreset = process.env.REACT_APP_UPLOAD_PRESET;
  const cloudName = process.env.REACT_APP_CLOUD_NAME;

  const [image, setImage] = useState(props.image || '');
  const [imageSelected, setImageSelected ] = useState('');

  const handleStatusChange = (status) => {
    setStatus(status);
  };

  const selectImage = (files) => {
    setImage('');
    setImageSelected(files[0]);
  };

  const handleImageUpload = () => {
    const data = new FormData();
    data.append('file', imageSelected);
    data.append('upload_preset', `${uploadPreset}`);
    data.append('cloud_name', `${cloudName}`);
    fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,{
      method: 'post',
      body: data,
    })
      .then(resp => resp.json())
      .then(data => {
        setImage(data.url);
      })
      .catch(err => {
        //console.log(err);
      });
  };

  const isImage = () => image ?
    (
      <div className={styles.imageContainer}>
        <p>Uploaded image</p>
        <img alt='hello' src={image}/>
      </div>
    )
    :
    (
      <Button variant="contained" color="primary" component="span" onClick={() => handleImageUpload()}>
       Click to upload
      </Button>
    );

  // Actions on form ubmit

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
      <form onSubmit={validate(handleSubmit)}>
        { (load.success && !load.error) &&
          (
            <div className={styles.successMessage}>
              <p>Your post has been successfully submitted!</p>
            </div>
          )
        }
        { (load.active) && <Spinner color="primary" className="standard-box d-block mr-auto ml-auto" /> }
        { ((!load.active && !load.success) || load.error) &&
        (
          <div className={styles.form}>
            <TextField
              style={{ width: '100%', marginBottom: '10px' }}
              {...register('title', { required: true, maxLength: 200 })}
              type='text'
              label='title'
              variant='outlined'
              value={title}
              onChange={e => setTitle(e.target.value)}
              width='200px'
            />
            {errors.title && <span className={styles.error}>This field is required. Title can have up to 200 characters.</span>}
            <ImageUploader
              className={styles.imageUploader}
              withIcon={false}
              withPreview={true}
              buttonText="Choose images"
              onChange={selectImage}
              imgExtension={['.jpg', '.gif', '.png']}
              maxFileSize={5242880}
              singleImage={true}
            />
            {isImage()}
            <TextField
              style={{ width: '100%', marginTop: '30px', marginBottom: '10px'}}
              {...register('text', { required: true, maxLength: 1000 })}
              required
              type='text'
              multiline
              minRows={5}
              label='text'
              variant='outlined'
              value={text}
              onChange={e => setDescription(e.target.value)}
            />
            {errors.text && <span className={styles.error}>This field is required. Text can have up to 1000 characters.</span>}
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
              {...register('phone', {required: true, max: 11, min: 11, maxLength: 11, pattern: /^\d{3}-\d{3}-\d{3}$/})}
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
          </div>
        )}
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
  price: PropTypes.number,
  phone: PropTypes.string,
  location: PropTypes.string,
};

export default PostForm;
