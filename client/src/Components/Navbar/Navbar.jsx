import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import axios from "axios"
import "./Navbar.css"

function Navbar() {
    const navigate = useNavigate()
    const userData = useSelector((state) => state.user.userData)

    return (
        <div className='navbar-container'>
            <div className='body-container'>
                <div className='navbar'>
                    <div className='img-container' onClick={() => navigate("/profile")}>
                        <img src={`http://localhost:5000/uploads/${userData.profileImg ? userData.profileImg.filename : "https://cdn-icons-png.flaticon.com/512/666/666201.png"}`} alt="profile" className='profile-img' />
                    </div>
                </div>

                <div className='home-text'>
                    <h1>Write Youre Nature Blogs</h1>
                    <h3>“Time spent amongst trees is never wasted time.” <br /> –Katrina Mayer</h3>
                </div>
            </div>
        </div>
    )
}

export default Navbar