import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { useDispatch } from 'react-redux'
import { setUserData } from '../../store/userSlice'
import "./ProfilePage.css";


function ProfilePage() {
    const [isChanged, setIsChanged] = useState(false)
    const [file, setFile] = useState();

    const navigate = useNavigate()

    //This is From Redux 
    //Redux gets this data after the login
    const userData = useSelector((state) => state.user.userData)

    // console.log("This is user data from redux", userData._id)

    //This is from Local Storage
    //Storing the user data to localstorage after the user login.
    const userDetailsLocal = JSON.parse(localStorage.getItem("userDetails"))

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAuth = async () => {
            try {
                const res = await axios.get('http://localhost:5000/checkAuth', { withCredentials: true });
                console.log("this is response from server", res)
                if (res.data.message === "Unauthorized Access" || "Unauthorized access restricted") {
                    navigate("/login")
                }
            } catch (error) {
                console.error("Error checking authentication:", error.message);
            }
        };
        fetchAuth();
    }, []);


    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('profile', file)

        await axios.post(`http://localhost:5000/profile/update/${userData ? userData._id : userDetailsLocal._id}`, formData, {
        }).then((response) => {
            console.log(response)
            const userDetails = response.data.user
            //Creating new user details for storing in the local storage
            //With updated profile image details
            const updatedUserData = {
                ...userDetailsLocal,
                profileImg: {
                    filename: response.data.user.profileImg.filename
                },
            }
            localStorage.setItem("userDetails", JSON.stringify(updatedUserData))
            //Settting the user data in redux after updating the profile img
            dispatch(setUserData(userDetails))
            setIsChanged(() => !isChanged)
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className='card-container-profile'>
            <div className='profile-image-container'>
                <img className='profile-image' src={`http://localhost:5000/uploads/${userData.profileImg?.filename}`} alt="profile-img" />
                <button className='profile-btn' onClick={() => { setIsChanged(!isChanged) }}>+</button>
                <input className={isChanged ? "profile-input-display" : "profile-input"} type="file" name='profile'
                    onChange={(e) => setFile(e.target.files?.[0])} />
            </div>
            <div className='items-container-body'>
                <div className='user-details'>
                    <h3 className='user-name'>{userData ? userData.name : userDetailsLocal.name}</h3>
                    <span className='user-email'>{userData ? userData.email : userDetailsLocal.email}</span>
                    <br />
                    <span className='user-email'>Phone: {userData ? userData.phone : userDetailsLocal.phone}</span>
                    {/* <span className='user-email'>ID: {userData ? userData._id : userDetailsLocal._id}</span> */}
                </div>
                <div className='btn-container'>
                    <button className={isChanged ? "file-update-display" : "file-update"} onClick={() => setIsChanged(!isChanged)}>Cancel</button>
                    <button className={isChanged ? "file-update-display" : "file-update"} onClick={handleSubmit}>Update</button>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
