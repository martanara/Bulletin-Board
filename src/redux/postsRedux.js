import axios from 'axios';
import { API_URL } from '../config';

/* selectors */
export const getAllPosts = ({posts}) => (posts.data).sort((a, b) => a.post.created > b.post.created);
export const getMyPosts = ({posts}, email) => posts.data.filter(post => post.email === email);
export const getAllPublished = ({posts}) => posts.data.filter(post => post.status === 'published');
export const getPostById = ({ posts }, postId) => (posts.data).find(post => post._id === postId);
export const getIsLoading = ({ posts }) => posts.loading;

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
const FETCH_END = createActionName('FETCH_END');

/* action creators */
export const updatePosts = payload => ({ type: UPDATE_POSTS, payload });

export const addPost = payload => ({ type: ADD_POST, payload });
export const removePost = payload => ({ type: REMOVE_POST, payload });
export const updatePost = payload => ({ type: UPDATE_POST, payload });

export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const fetchEnded =  payload => ({ payload, type: FETCH_END });

/* thunk creators */

export const fetchAllPosts = () => {
  return (dispatch) => {
    dispatch(fetchStarted());

    axios
      .get(`${API_URL}/posts`)
      .then(res => {
        dispatch(fetchSuccess(res.data));
        dispatch(fetchEnded());
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const addPostRequest = (post) => async dispatch => {
  try {
    dispatch(fetchStarted());
    const res = await axios({
      method: 'post',
      url: `${API_URL}/posts`,
      data: post,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    dispatch(addPost(res.data));
    dispatch(fetchEnded());
  } catch (err) {
    dispatch(fetchError(err));
  }
};

export const updatePostRequest = (post, id) => async dispatch => {
  try {
    dispatch(fetchStarted());
    const res = await axios({
      method: 'put',
      url: `${API_URL}/post/${id}`,
      data: post,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    dispatch(updatePost(res.data));
    dispatch(fetchEnded());
  } catch (err) {
    dispatch(fetchError(err));
  }
};

export const removePostRequest = (postId) => {
  return (dispatch) => {
    dispatch(fetchStarted());

    axios
      .delete(`${API_URL}/post/${postId}`)
      .then(res => {
        dispatch(removePost(res.data));
        dispatch(fetchEnded());
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
          success: true,
        },
        data: [...statePart.data, { ...action.payload}],
      };
    case REMOVE_POST:
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
          success: true,
        },
        data: statePart.data.filter(post => post._id !== action.payload),
      };
    case UPDATE_POST:
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
          success: true,
        },
        data: statePart.data.map(post => post._id === action.payload._id ? { ...post, ...action.payload } : post),
      };
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
          success: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
          success: true,
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
          success: false,
        },
      };
    }
    case FETCH_END:
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
          success: false,
        },
      };
    default:
      return statePart;
  }
};
