import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUserDataAdmin } from '../../store/adminSlice'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import "./AdminHomePage.css"

function AdminHomePage() {
    const [query, setQuery] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Admin Auth check api
    useEffect(() => {
        const fetchAuth = async () => {
            try {
                const res = await axios.get('http://localhost:5000/admin/checkAuthAdmin', { withCredentials: true });
                console.log("this is response from server", res)
                if (res.data.message === "Unauthorized Access" || "Unauthorized access restricted") {
                    navigate("/admin/login")
                }
            } catch (error) {
                console.error("Error checking authentication:", error.message);
            }
        };
        fetchAuth();
    }, []);

    //Search Fetching
    useEffect(() => {
        try {
            const fetchUsers = async () => {
                let res = await axios.get(`http://localhost:5000/admin/search?q=${query}`)
                console.log(res.data)
                if (res.data.length > 0) {
                    console.log(res.data)
                    let userData = res.data
                    dispatch(setUserDataAdmin(userData))
                }
            }
            fetchUsers()
        } catch (error) {
            console.log(error)
        }
    }, [query])

    //Render Fetching
    useEffect(() => {
        try {
            const fetchUsers = async () => {
                let response = await axios.get("http://localhost:5000/admin/users");
                console.log(response.data.allUsers)
                const userData = response.data.allUsers;
                dispatch(setUserDataAdmin(userData))
            }
            fetchUsers()
        } catch (error) {
            console.log(error)
        }
    }, [])

    //Deleting the user
    const deleteUser = async (userId) => {
        await axios.delete(`http://localhost:5000/admin/delete/${userId}`).then((res) => {
            const userData = res.data.allUsers
            dispatch(setUserDataAdmin(userData))
        }).catch((error) => {
            console.log(error);
        })
    }

    const allUserData = useSelector((state) => state.admin.userDataAdmin)

    return (
        <div className='main-container'>
            <div className='items-container'>
                <h1 className='head-text'>Admin Panel</h1>
                <div className="search-form">
                    <input type="search" placeholder="Search users..." className="search-input" value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
                <button className='admin-logout' onClick={() => {
                    navigate("/admin/new-user")
                }}>Create User</button>
            </div>

            <div className='table-container'>
                <table className='user-table'>
                    <tbody>
                        {allUserData?.map((user) => (
                            <tr key={user._id}>
                                <td><img className='admin-user-profile' src={`http://localhost:5000/uploads/${user.profileImg?.filename}`} alt="profile-img" /></td>
                                <td>{user.name}</td>
                                <td>{user.phone}</td>
                                <td>{user.email}</td>
                                <td>
                                    <div className='admin-user-btn'>
                                        <button onClick={() => {
                                            navigate("/admin/edit", {
                                                state: {
                                                    userId: user._id
                                                }
                                            })
                                        }}>Edit</button>
                                        <button onClick={() => deleteUser(user._id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminHomePage