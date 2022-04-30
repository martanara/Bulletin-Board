import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import MainLayout from './components/layout/MainLayout/MainLayout';
import Homepage from './components/views/Homepage/Homepage';
import Post from './components/views/Post/Post';
import PostEdit from './components/views/PostEdit/PostEdit';
import PostAdd from './components/views/PostAdd/PostAdd';
import NotFound from './components/views/NotFound/NotFound';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#2B4C6F' },
  },
});

const App = () => {
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
              <Route path='*' component={<NotFound/>} />
            </Routes>
          </MainLayout>
        </ThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  );
};


export default App;
