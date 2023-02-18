import React,{useEffect,useState} from 'react';
import NavBar from '../../../shared/navber/navber'
import "./profile.css";
import { CUSTOM_AXIOS } from '../../../../service/customAxios'
import UserCard from '../../../shared/cards/cardsUser';
const Profile = () => {

    const [blogs, setBlogs] = useState([]);
        
        useEffect(() => {
            return async() => {
              const res = await CUSTOM_AXIOS.get("/user/profile");
                
                if(res.status == 200){
                  const result = res.data;
                  console.log(result)
                  setBlogs(result.userInfo.blogs)
                }
            };
    }, []);
    console.log("blogs",blogs)
  return (
    <div>
        <NavBar />
        <div className='profile_info'>
            <h2>Name: Chitrak Biswas</h2>
            <h3>E-mail: Chitrak@Biswas</h3>
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