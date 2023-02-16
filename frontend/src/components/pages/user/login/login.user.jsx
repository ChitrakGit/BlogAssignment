import React, { useState } from "react";
import { Link } from "react-router-dom";
import { URL } from "../../../../constant/constant";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export const Login = (props) => {
    const [input, setInput] = useState({email:"",password:""});
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(input);

        const response = await axios.post(URL+"/user/login",input)
        console.log("response",response)
        if(response.status == 200){
            const result = response.data;
            localStorage.setItem("key",result.key)
            alert("Login successful");
            return navigate("/");
        }else{
            return alert("Wrong credentials")
        }
    }
    const handleChange = (event)=>{
        console.log(event.target.name, event.target.value)
        setInput({...input,[event.target.name]:event.target.value})
    }

    return (
        <div className="auth-page auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
                <label htmlFor="email">email</label>
                <input value={input.email} onChange={handleChange} type="email" placeholder="email@gmail.com" id="email" name="email" required />
                <label htmlFor="password">password</label>
                <input value={input.password} onChange={handleChange} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
            <p to="/signup">Don't have a account? click Here to <Link to="/signup">sign-up</Link></p>
            <p to="/signup">See blogs as visitor <Link to="/">Home</Link></p>
        </div>
    )
}