
import './App.css';
import PageNotFound from './components/pages/404/404Page';
import { AddBlog } from './components/pages/blogs/blogOperations/addBlogs';
import { EditBlog } from './components/pages/blogs/blogOperations/editBlog';
import AllBlogs from './components/pages/blogs/viewBlogs/allBlogs';
import Blog from './components/pages/blogs/viewBlogs/blog';
import { Login } from './components/pages/user/login/login.user';
import Profile from './components/pages/user/profile/profile';
import { Signup } from './components/pages/user/signup/signup.user';
import { Routes,Route } from 'react-router-dom';

function App() {
  return (
    <>
    <div className='App'>
    <Routes>
     
      <Route path="/blog/edit/:slug" element={<EditBlog />} />
      <Route path="/blog/:slug" element={<Blog />} />
      
      <Route path="/add-blog" exact element={<AddBlog />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />  
      <Route path="/404" element={<PageNotFound />} />   
      <Route path="/" element={<AllBlogs />} />
      <Route path="*" element={<PageNotFound />} />        
    </Routes>
    </div>
 </>
  );
}

export default App;


{/* <Route exact path='/login' component={Login} /> */}
{/* <Route exact path='/signup' component={Signup} /> */}
{/* <Route exact path='/' component={AllBlogs} /> */}
