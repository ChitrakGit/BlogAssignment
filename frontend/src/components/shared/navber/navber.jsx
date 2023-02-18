import { Link, useNavigate,useLocation  } from 'react-router-dom';
import {useState,useEffect} from "react";
import "./navber.css"
const NavBar = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    

    const logout = ()=>{
        localStorage.removeItem("secret_token");
        localStorage.removeItem("auth_token");
        setShow(false)
        if(location == "/")
        {
            window.location.reload()
        }else{
            navigate("/")
        }
        
    }
   
    useEffect(() => {
        return () => {
           if(localStorage.getItem("secret_token")){
            setShow(true);
        }
        };
    }, [logout]);

    

 return (
    <div >

        <div id="container">
            <nav>
                <div id="logo"> <Link to="/" className='logo-design'>Blogs</Link></div>
                <ul>
                    {
                        show?
                            <>
                                <li><Link to="/profile">Profile</Link></li>
                                <li><Link to="/add-blog">Add</Link></li>
                                <li onClick={logout} style={{color:"white",cursor:"pointer"}}>Logout</li>
                            </>
                        :(
                        <>
                            
                            <li><Link to="/login">Login / Sign-up</Link></li>
                        </>
                        )
                    }
                    
                    {/* <li><Link to="/signup">Sign-up</Link></li> */}
              
                </ul>
            </nav>
        </div>

    </div>
 );
};

export default NavBar;

// //  <nav>
// <ul>
// <li>
//    <Link to="/">Home</Link>
// </li>
// <li>
//    <Link to="/login">Login</Link>
// </li>
// <li>
//    <Link to="/signup">Signup</Link>
// </li>
// </ul>
// </nav>