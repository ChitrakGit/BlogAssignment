import React from 'react'
import "./card.css"
import { Link } from 'react-router-dom'
const Card = () => {
  return (
    <div className='cards'>
        
        <div className='card'>
            <div className="img-card iCard-style1">
                <div className="card-content">
                    <div className="card-image">
                    <span className="card-title">Cloud Beauty</span>
                        <img src="https://www.dropbox.com/s/u330jm6faybxrvb/fog-3461451_640.jpg?raw=1"/>
                    </div>
                    
                    <div className="card-text">
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                    </div>
                    
                </div>
                
                <div className="card-link">
                    <Link to="/blog/newBlog"><span>Read Full</span></Link>
                </div>
            </div>  
        </div>        
    </div>
  )
}

export default Card