import React from 'react'
import "./card.css"
import { Link } from 'react-router-dom'
import { URL } from '../../../constant/constant'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const UserCard = ({details}) => {
    const navigate = useNavigate();
    console.log("details",details)
    const deleteCard = async(id)=>{
        const text = "Sure, to delete this post";
        if (window.confirm(text) == true) {
            const res = await axios.delete(URL+"/blog/delete/"+id,{headers:{"user-key":localStorage.getItem("key")}})
            console.log("res",res)
            if(res.status == 200){
                alert("Deleted Successful")
                return navigate(0);
            }else{
                return alert("Failed to delete")
            }
           
          } 
        // console.log("delete card",id)
    }
    
  return (
    <div >
        
        <div className='card'>
            <div className="img-card iCard-style1">
                <div className="card-content">
                    <div className="card-image">
                    
                        <img src={`${URL}/file/view/${details.image.filename}`}/>
                    </div>
                    
                    <div className="card-text">
                        <h3>{details.heading}</h3>
                        <p className='sort-content'>{details.text}</p>
                    </div>
                </div>
                
                <div className="card-link">
                    <Link to={`/blog/${details._id}`}><span>Read Full</span></Link>
                </div>
                <div className="card-link-left">
                    <p><Link to={`/blog/edit/${details._id}`}><span>Edit</span></Link> | <span style={{cursor: "pointer"}} onClick={()=>deleteCard(details._id)} >Delete</span></p>
                </div>
            </div>  
        </div>        
    </div>
  )
}

export default UserCard