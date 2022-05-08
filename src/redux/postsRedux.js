import Axios from 'axios';
import { API_URL } from '../config';
import uniqid from 'uniqid';

/* selectors */
export const getAllPosts = ({posts}) => posts.data;
export const getAllPublished = ({posts}) => posts.data.filter(item => item.status === 'published');
export const getPostById = ({ posts }, postId) => (posts.data).find(post => post._id === postId);

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const UPDATE_POSTS = createActionName('UPDATE_POSTS');

const ADD_POST = createActionName('ADD_POST');
const REMOVE_POST = createActionName('REMOVE_POST');
const UPDATE_POST = createActionName('UPDATE_POST');

const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

/* action creators */
export const updatePosts = payload => ({ type: UPDATE_POSTS, payload });

export const addPost = payload => ({ type: ADD_POST, payload });
export const removePost = payload => ({ type: REMOVE_POST, payload });
export const updatePost = payload => ({ type: UPDATE_POST, payload });

export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

/* thunk creators */

export const fetchAllPosts = () => {
  return (dispatch) => {
    dispatch(fetchStarted());

    Axios
      .get(`${API_URL}/posts`)
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const addPostRequest = (post) => {
  return (dispatch) => {
    dispatch(fetchStarted());

    Axios
      .post(`${API_URL}/posts`, post)
      .then(res => {
        dispatch(addPost(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const updatePostRequest = (post, id) => {
  return (dispatch) => {
    dispatch(fetchStarted());

    Axios
      .put(`${API_URL}/post/${id}`, post)
      .then(res => {
        dispatch(updatePost(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const removePostRequest = (postId) => {
  return (dispatch) => {
    dispatch(fetchStarted());

    Axios
      .delete(`${API_URL}/post/${postId}`)
      .then(res => {
        dispatch(removePost(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case UPDATE_POSTS:
      return { ...statePart, data: [...action.payload] };
    case ADD_POST:
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: [...statePart.data, { ...action.payload, id: uniqid() }],
      };
    case REMOVE_POST:
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: statePart.data.filter(post => post._id !== action.payload),
      };
    case UPDATE_POST:
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: statePart.data.map(post => post._id === action.payload._id ? { ...post, ...action.payload } : post),
      };
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    default:
      return statePart;
  }
};
