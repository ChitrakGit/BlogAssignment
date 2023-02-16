import React,{useEffect,useState} from 'react'
import NavBar from '../../../shared/navber/navber'
import Card from '../../../shared/cards/cards'
import axios from 'axios';
import { URL } from '../../../../constant/constant';

const AllBlogs = () => {
  const [blogs,setBlogs] = useState([])
  useEffect(() => {
    return async() => {
      const res = await axios.get(URL+"/blog");
        console.log("res",res)
        if(res.status == 200){
          const result = res.data;
          setBlogs(result.blogs)
        }
    };
  }, []);

  console.log("blogs",blogs)

  return (
    <div>
        <NavBar />
        <div className='cards'>
          {
            blogs.map((item,index)=>{
              return (
                <div>
                  <Card details={item} key={index} />
                </div>
              )
            })
          }
      

        </div>
    </div>
  )
}

export default AllBlogs