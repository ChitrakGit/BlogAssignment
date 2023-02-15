
import './App.css';
import { AddBlog } from './components/pages/blogs/addBlogs';
import AllBlogs from './components/pages/blogs/allBlogs';
import Blog from './components/pages/blogs/blog';
import { Login } from './components/pages/user/login/login.user';
import { Signup } from './components/pages/user/signup/signup.user';
import { Routes,Route } from 'react-router-dom';

function App() {
  return (
    <>
    <div className='App'>
    <Routes>
    <Route path="/" element={<AllBlogs />} />
        <Route path="/blog/:slug" element={<Blog />} />
       <Route path="/signup" exact element={<Signup />} />
       <Route path="/add-blog" exact element={<AddBlog />} />
       <Route path="/login" exact element={<Login />} />
       
       
    </Routes>
    </div>
 </>
  );
}

export default App;


{/* <Route exact path='/login' component={Login} /> */}
{/* <Route exact path='/signup' component={Signup} /> */}
{/* <Route exact path='/' component={AllBlogs} /> */}
