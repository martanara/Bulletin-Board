import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllPosts } from './redux/postsRedux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import MainLayout from './components/MainLayout/MainLayout';
import Homepage from './components/Homepage/Homepage';
import Post from './components/Post/Post';
import PostEdit from './components/PostEdit/PostEdit';
import PostAdd from './components/PostAdd/PostAdd';
import NotFound from './components/NotFound/NotFound';
import MyPosts from './components//MyPosts/MyPosts';
import AllPosts from './components/AllPosts/AllPosts';

const theme = createTheme({
  palette: {
    primary: { main: '#4381C1' },
  },
});

console.log(theme);

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
              <Route exact path='/allposts' element={<AllPosts/>} />
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
