import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllPosts } from './redux/postsRedux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import MainLayout from './components/layout/MainLayout/MainLayout';
import Homepage from './components/views/Homepage/Homepage';
import Post from './components/views/Post/Post';
import PostEdit from './components/views/PostEdit/PostEdit';
import PostAdd from './components/views/PostAdd/PostAdd';
import NotFound from './components/views/NotFound/NotFound';
import MyPosts from './components/features/MyPosts/MyPosts';

const theme = createTheme({
  palette: {
    primary: { main: '#2B4C6F' },
  },
});

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchAllPosts()), [dispatch]);

  return (
    <BrowserRouter>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MainLayout>
            <Routes>
              <Route exact path='/' element={<Homepage/>} />
              <Route exact path='/post/add' element={<PostAdd/>} />
              <Route exact path='/post/:id' element={<Post/>} />
              <Route exact path='/post/:id/edit' element={<PostEdit/>} />
              <Route exact path='/myposts' element={<MyPosts/>} />
              <Route path='*' element={<NotFound/>} />
            </Routes>
          </MainLayout>
        </ThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  );
};


export default App;
