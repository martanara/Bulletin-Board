export const initialState = {
  posts: {
    data: [{
      _id: '627ceb729f063b2f3174bzzz',
      author: 'the.admin@example.com',
      created: '2022-05-12T11:41:38.000+00:00',
      updated: '2022-05-12T11:41:38.000+00:00',
      status: 'published',
      title: 'Welcome to our bulletin board!',
      text: 'Email me to register and get an account!',
      photo: null,
      price: null,
      phone: null,
      location: null,
    }],
    loading: {
      active: false,
      error: false,
    },
  },
  users: {
    role: 'guest',
    email: 'guest@guest.com',
    name: 'Guest',
  },
};
