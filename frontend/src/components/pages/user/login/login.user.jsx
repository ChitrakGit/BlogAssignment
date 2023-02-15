import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Login = (props) => {
    const [input, setInput] = useState({email:"",password:""});

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input);
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