import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "./AdminEditPage.css"
import axios from 'axios'

function AdminEditPage() {
    const [user, setUser] = useState({})

    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")

    const location = useLocation();
    let userId = location.state.userId;

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/admin/edit/${userId}`).then((response) => {
            console.log(response.data.user)
            setUser(response.data.user)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userName = name ? name : user.name;
        const userPhone = name ? phone : user.phone;
        await axios.put(`http://localhost:5000/admin/edit/${userId}`, { userName, userPhone }).then((res) => {
            console.log(res)
            if (res.data.status) {
                navigate("/admin")
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className='form-container'>
                    <div className='input-container'>
                        <input type="text" placeholder={user.name} name='name' value={name} onChange={handleNameChange} />
                        <input type="text" placeholder={user.phone} name='phone' value={phone} onChange={handlePhoneChange} />
                    </div>
                    <button className='submit-btn'>Update</button>
                </div>
            </form>
        </div>
    )
}

export default AdminEditPage
