import { Link } from 'react-router-dom';
import "./navber.css"
const NavBar = () => {
 return (
    <div >

        <div id="container">
            <nav>
                <div id="logo"> Blogs</div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/add-blog">Add</Link></li>
                    <li><Link to="/login">Login / Sign-up</Link></li>
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