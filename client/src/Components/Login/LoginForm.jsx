import React, { useState } from 'react'
import "./LoginForm.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { setUserData } from '../../store/userSlice'
import Cookies from 'universal-cookie';
const cookies = new Cookies()

function LoginForm(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("")
        if (props.role === "user") {
            try {
                await axios.post('http://localhost:5000/login', { email, password }).then((response) => {
                    if (response.status === 200) {
                        console.log(response.data.token)
                        const userToken = response.data.token;
                        cookies.set("accessToken", userToken)
                        const userData = response.data.user;
                        console.log("server response", userData);
                        localStorage.setItem("userDetails", JSON.stringify(userData))
                        dispatch(setUserData(userData));
                        navigate("/")
                    }
                }).catch((error) => {
                    setError("Please Provide Valid Data")
                    console.log(error.message);
                })
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                await axios.post("http://localhost:5000/admin/login", { email, password }).then((response) => {
                    if (response.status === 200) {
                        const adminToken = response.data.token;
                        cookies.set("accessTokenAdmin", adminToken)
                        navigate("/admin");
                    }
                })
            } catch (error) {
                setError("Please Provide Valid Data")
                console.log(error);
            }
        }
    }

    return (
        <div className='form'>
            <form onSubmit={handleSubmit} className='form'>
                <div className='input'>
                    <div className='error-div'>
                        {error ? <p>{error}</p> : null}
                    </div>
                    <input type="text" placeholder='Email...' name='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="text" placeholder='Password...' name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className='submit-btn'>Submit</button>
                <div className='login-link'>
                    <span className='login-register' onClick={() => {
                        navigate("/register")
                    }}><small>New User?</small> Register</span>
                </div>
            </form>
        </div>
    )
}

export default LoginForm