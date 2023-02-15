import React, { useState } from "react";
import { Link } from "react-router-dom";

export const AddBlog = (props) => {
    const [input, setInput] = useState({heading:"",details:"",file:{}});
    const [file, setFile] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input);
    }
    const handleChange = (event)=>{
        if (event.target.files) {
            setInput({...input,file:event.target.files[0]});
          }else{
            setInput({...input,[event.target.name]:event.target.value})
          }
    }

    return (
        <div className="auth-page auth-form-container">
            <h2>Add Blog</h2>
            <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
                <label htmlFor="heading">Heading</label>
                <input value={input.heading} onChange={handleChange} type="text" placeholder="Blog Heading" id="heading" name="heading" required />

                <label htmlFor="details">Details</label>
                <textarea value={input.details} rows="15" cols="50" onChange={handleChange} id="details" name="details" placeholder="Blog Details"></textarea>

                <label htmlFor="heading">Blog Image</label>
                <input type="file" placeholder="Blog Heading" id="heading" name="heading" required />
                <button type="submit" style={{marginTop:"20px"}}>Add Blog</button>
            </form>
            
        </div>
    )
}