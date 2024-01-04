import React from 'react'
import './RegisterForm.css'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import { registerSchem } from '../../schema'

function RegisterForm(props) {

    const navigate = useNavigate();

    const initialValues = {
        name: "",
        email: "",
        phone: "",
        password: "",
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: registerSchem,
        onSubmit: (values, action) => {
            if (props.role === "user") {
                const submitForm = async () => {
                    let response = await axios.post('http://localhost:5000/register', values)
                    if (response.status === 200) {
                        navigate("/login")
                    }
                }
                submitForm();
            } else {
                const submitForm = async () => {
                    let response = await axios.post('http://localhost:5000/register', values)
                    if (response.status === 200) {
                        navigate("/admin")
                    }
                }
                submitForm()
            }
            action.resetForm();
        }
    });


    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className='form-container'>
                    <div className='input-container'>
                        <input type="text" placeholder='Name...' name='name' id='name' value={values.name} onChange={handleChange} onBlur={handleBlur} />
                        {errors.name && touched.name ? <p className='form-error'>{errors?.name}</p> : null}
                        <input type="text" placeholder='Email...' name='email' id='email' value={values.email} onChange={handleChange} onBlur={handleBlur} />
                        {errors.email && touched.email ? <p className='form-error'>{errors?.email}</p> : null}
                        <input type="text" placeholder='Phone...' name='phone' id='phone' value={values.phone} onChange={handleChange} onBlur={handleBlur} />
                        {errors.phone && touched.phone ? <p className='form-error'>{errors?.phone}</p> : null}
                        <input type="password" placeholder='Password...' name='password' id='password' value={values.password} onChange={handleChange} onBlur={handleBlur} />
                        {errors.password && touched.password ? <p className='form-error'>{errors?.password}</p> : null}
                    </div>

                    {/* <div className='radio-container'>
                    
                        <div className='radio-male'>
                            <input type="radio" name='gender' value="Male" onChange={(e) => setGender(e.target.value)} />
                            <label htmlFor="">Male</label>
                        </div>
                        <div className='radio-female'>
                            <input type="radio" name='gender' value="Female" onChange={(e) => setGender(e.target.value)} />
                            <label htmlFor="">Female</label>
                        </div>

                    </div> */}

                    <button className='submit-btn' type='submit'>Submit</button>
                </div>
                <div className='login-link'>
                    <span className='login-register' onClick={() => {
                        navigate("/login")
                    }}><small>Alredy have Account?</small> Login</span>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm