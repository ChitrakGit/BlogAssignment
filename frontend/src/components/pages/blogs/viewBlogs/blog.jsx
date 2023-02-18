import React,{useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import "./blog.css"
import NavBar from '../../../shared/navber/navber';

import { URL } from '../../../../constant/constant';
import { CUSTOM_AXIOS } from '../../../../service/customAxios';
const Blog = () => {
    const navigate = useNavigate() ;
    const { slug } = useParams();

    const [blog,setBlog]  = useState(null);

    useEffect(() => {
        
        return async() => {
            try {
                const res = await CUSTOM_AXIOS.get("/blog/"+slug);
                console.log("in details",res)
                if(res.status=200){
                    const result = res.data;
                    setBlog(result.blog)
                }else{
                    return alert("Server Error")
                }
            } catch (error) {
                navigate("/404")
            }
        };
    }, []);

    // console.log("from blog page",slug);

  return (
    <div>
         <NavBar />
         {
            blog ? ( 
                <div className='blog'>
                    <div className='detail-img'>
                        <img src={`${URL}/file/view/${blog.image.filename}`} height="40%" width="50%" />
                    </div>

            
                    <div className='author'>
                        Author:  <span className='author-name'>{blog.user_id.name}</span>
                    </div>
                    <hr className='divider'/>
                    <h2>{blog.heading}</h2>
                    <hr className='divider'/>
                    <div className="paragraph">
                        <p>{blog.text}</p>
                    </div>
                </div>
            )
            : null
         }
       
    </div>
    
  )
}

export default Blog