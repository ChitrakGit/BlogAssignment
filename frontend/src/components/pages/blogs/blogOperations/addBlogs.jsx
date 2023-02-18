import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import NavBar from "../../../shared/navber/navber";
import axios from "axios";
import { URL } from "../../../../constant/constant";
import { CUSTOM_AXIOS } from "../../../../service/customAxios";

export const AddBlog = (props) => {
    const navigate = useNavigate();
    const [input, setInput] = useState({heading:"",text:"",image:{}});
    const [file, setFile] = useState({});

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        const data = new FormData();
      
        for(let item in input){
            data.append(item,input[item]);
        }

        try {
            const res = await CUSTOM_AXIOS.post("/blog/add",data)
            console.log("res",res)
            if(res.status == 200){
                alert("Post Added successfully");
                return navigate("/");
            }else{
                return alert(res.data.text)
            }
        } catch (error) {
            if(error.response){
                return alert(error.response.data.text)
            }else{
                console.log(error.message)
            }
            
        }
    }

    const handleChange = (event)=>{
        if (event.target.files) {
            setInput({...input,image:event.target.files[0]});
          }else{
            setInput({...input,[event.target.name]:event.target.value})
          }
    }

    return (
        <div>
            <NavBar />
            <div className="auth-page auth-form-container" style={{marginTop:"-60px"}}>
                <h2>Add Blog</h2>
                <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
                    <label htmlFor="heading">Heading</label>
                    <input value={input.heading} onChange={handleChange} type="text" placeholder="Blog Heading" id="heading" name="heading" required />

                    <label htmlFor="details">Details</label>
                    <textarea value={input.text} rows="15" cols="50" onChange={handleChange} id="details" name="text" placeholder="Blog Details"></textarea>

                    <label htmlFor="heading">Blog Image</label>
                    <input type="file" onChange={handleChange} placeholder="Blog Heading" id="heading" name="image" required />
                    <button type="submit" style={{marginTop:"20px"}}>Add Blog</button>
                </form>
            
            </div>
        </div>
        
    )
}