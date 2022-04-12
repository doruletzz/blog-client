import axios from 'axios';

import { Provider } from 'react-redux'
import { useState, useEffect } from 'react';
import Post from './components/Post';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostCardList from './components/PostCardList';

import { store } from './redux/app/store'
import { Container } from 'react-bootstrap';
import PostAddForm from './components/PostAddForm';

const baseURL = "http://localhost:4000/post"

function App() {

  const [post, setPost] = useState({});


  useEffect(() => {
    axios.get(baseURL).then(res => setPost(res.data[0]));

  }, []);

  if (!post) return null;

  return (
    <main>
      <div>
        <Provider store={store}>
          <Container>
            <Router>
              <Routes>
                <Route path="/" element={<PostCardList count={5} />} />
                <Route path="/blog/:slug" element={<Post />} />
                <Route path="/blog-add/" element={<PostAddForm />} />
              </Routes>
            </Router>
          </Container>
        </Provider>
      </div>
    </main>
  )
}

export default App
