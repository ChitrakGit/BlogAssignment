import React, { useState,useEffect } from "react";
import { Link,useParams } from "react-router-dom";
import NavBar from "../../../shared/navber/navber";
import axios from "axios";
import { URL } from "../../../../constant/constant";
import { useNavigate } from "react-router-dom";
export const EditBlog = (props) => {
    const navigate = useNavigate();
    const { slug } = useParams();

    const [input, setInput] = useState({heading:"",text:"",image:{}});
    const [file, setFile] = useState({});

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(input);

        const data = new FormData();
      
        for(let item in input){
            data.append(item,input[item]);
        }

        const res = await axios.put(URL+"/blog/edit/"+slug,data,{headers:{"user-key":localStorage.getItem("key")}})
        console.log("res",res)
        if(res.status == 200){
            alert("Post Edited successfully");
            return navigate("/");
        }else{
            return alert(res.data.text)
        }
    }
    const handleChange = (event)=>{
        if (event.target.files) {
            setInput({...input,image:event.target.files[0]});
          }else{
            setInput({...input,[event.target.name]:event.target.value})
          }
        // console.log(event.target.name, event.target.value)
    }

    useEffect(() => {
        
        return async() => {
            const res = await axios.get(URL+"/blog/"+slug);
            console.log("in details",res)
            if(res.status=200){
                const blogInfo = res.data.blog;
                setInput({heading:blogInfo.heading,text:blogInfo.text})
                // setBlog(result.blog)
            }else{
                return alert("Server Error")
            }
        };
    }, []);

    return (
        <div>
            <NavBar />
            <div className="auth-page auth-form-container" style={{marginTop:"-60px"}}>
                <h2>Edit Blog</h2>
                <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
                    <label htmlFor="heading">Heading</label>
                    <input value={input.heading} onChange={handleChange} type="text" placeholder="Blog Heading" id="heading" name="heading" required />

                    <label htmlFor="details">Details</label>
                    <textarea value={input.text} rows="15" cols="50" onChange={handleChange} id="details" name="text" placeholder="Blog Details"></textarea>

                    <label htmlFor="heading">Blog Image</label>
                    <input onChange={handleChange} type="file" placeholder="Blog Heading" id="heading" name="image" />
                    <button type="submit" style={{marginTop:"20px"}}>Add Blog</button>
                </form>
                
            </div>
        </div>
    )
}