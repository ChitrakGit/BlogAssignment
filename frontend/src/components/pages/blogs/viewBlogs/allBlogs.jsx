import React,{useEffect,useState} from 'react'
import NavBar from '../../../shared/navber/navber'
import Card from '../../../shared/cards/cards'
import { URL } from '../../../../constant/constant';
import { CUSTOM_AXIOS } from '../../../../service/customAxios';

const AllBlogs = () => {
  const [blogs,setBlogs] = useState([])
  useEffect(() => {
    return async() => {
      const res = await CUSTOM_AXIOS.get("/blog");
        
        if(res.status == 200){
          const result = res.data;
          setBlogs(result.blogs)
        }
    };
  }, []);


  return (
    <div>
        <NavBar />
        <div className='cards'>
          {
            blogs.map((item,index)=>{
              return (
                <div key={index}>
                  <Card details={item}  />
                </div>
              )
            })
          }
      

        </div>
    </div>
  )
}

export default AllBlogs