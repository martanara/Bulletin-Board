export const initialState = {
  posts: {
    data: [],
    loading: {
      active: false,
      error: false,
    },
  },
  user: {
    role: 'guest',
    email: '',
    displayName: '',
    posts: [],
  },
};
