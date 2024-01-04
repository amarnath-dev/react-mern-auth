import React from 'react'
import LoginForm from '../Components/Login/LoginForm'

function Login(props) {
    return (
        <div>
            <LoginForm role={props.role} />
        </div>
    )
}

export default Login