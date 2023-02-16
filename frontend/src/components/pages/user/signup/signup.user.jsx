import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { URL } from "../../../../constant/constant";
import { useNavigate } from "react-router-dom";



export const Signup = (props) => {
    const [input, setInput] =  useState({email:"",password:"",name:""});
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(input);
        const response = await axios.post(URL+"/user/signup",input)
        console.log("response",response)
        if(response.status == 200){
            const result = response.data;
            localStorage.setItem("key",result.key)
            alert("Signup Successful");
            return navigate("/");
        }
    }
    const handleChange = (event)=>{
        console.log(event.target.name, event.target.value)
        setInput({...input,[event.target.name]:event.target.value})
    }
    return (
        <div className="auth-page auth-form-container">
            <h2>Sign Up</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label>
            <input value={input.name} name="name" onChange={handleChange} id="name" placeholder="full Name" required />
            <label htmlFor="email">email</label>
            <input value={input.email} onChange={handleChange}type="email" placeholder="youremail@gmail.com" id="email" name="email" required />
            <label htmlFor="password">password</label>
            <input value={input.password} onChange={handleChange} type="password" placeholder="********" id="password" name="password" required />
            <button type="submit">Sign Up</button>
        </form>
        
        <p >Already have an account? click Here to <Link to="/login">login</Link></p>
        <p >See blogs as visitor <Link to="/">Home</Link></p>
    </div>
    )
}