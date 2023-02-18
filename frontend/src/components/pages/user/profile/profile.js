import React,{useEffect,useState} from 'react';
import NavBar from '../../../shared/navber/navber'
import "./profile.css";
import { CUSTOM_AXIOS } from '../../../../service/customAxios'
import UserCard from '../../../shared/cards/cardsUser';
import { handleError } from '../../../../service/handleError';


const Profile = () => {
  
    const [blogs, setBlogs] = useState([]);
    const [info,setInfo] = useState({name:"",email:""});
        useEffect(() => {
           return async() => {
             try {
               const res = await CUSTOM_AXIOS.get("/user/profile");
             
               if(res.status == 200){
                 const result = res.data;
                 console.log(result)
                 const userInfo = {name:result.userInfo.name,email:result.userInfo.email}
                 setInfo(userInfo)
                 setBlogs(result.userInfo.blogs)
               }
             } catch (error) {
               const msg = handleError(error);
               localStorage.removeItem("secret_token")
               localStorage.removeItem("auth_token")
               window.location.replace('/');
               return alert("logout and login again")
             }
           };
    }, [NavBar]);
  
  return (
    <div>
        <NavBar />
        <div className='profile_info'>
            <h2>Name: {info.name}</h2>
            <h3>E-mail: {info.email }</h3>
        </div>
        <hr className='divider' />
        <div className='profile_info'>
            <h1>My Blogs</h1>
        </div>
        <div className='cards'>
          {
            blogs.map((item,index)=>{
              return (
                <div key={index}>
                  <UserCard details={item}  />
                </div>
              )
            })
          }
      

        </div>
    </div>
  )
}

export default Profile