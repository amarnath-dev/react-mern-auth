import React from 'react'
import RegisterForm from '../Components/Register/RegisterForm'

function Register(props) {
    return (
        <div>
            <RegisterForm role={props.role} />
        </div>
    )
}

export default Register