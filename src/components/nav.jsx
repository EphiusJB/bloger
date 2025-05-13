import React, { useState } from 'react'
import './components.css'
import { signOut } from 'firebase/auth'
import AddPost from './addPost'

export default function Nav({auth, user}) {
    const handleLogout = async() => {
        // Implement logout functionality here
        await signOut(auth)
    }
    const handleProfileClick = () => {
        // Implement profile click functionality here
        // For example, redirecting to the profile page:
        // window.location.href = `/profile/${user.uid}`;
    }
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <nav className="navbar">
                <div className="topBox">
                    <h1 className='logo'>Blogger</h1>
                <div className="nav-links">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/chats">Chats</a></li>
                        <li><a href="/notifications">Notifications</a></li>
                        <li><a href="/settings">Settings</a></li>
                        <li><button onClick={()=> setShowModal(true)}>New Post</button></li>
                    </ul>
                    <AddPost isOpen={showModal} onclose={()=> setShowModal(false)} auth={auth}/>
                </div>
                </div>
                <div className="profile">
                    {user.displayName}
                </div>
                <div className="auth">
                    <button className="logout" onClick={handleLogout}>Logout</button>
                </div>
            </nav>
        </>
    )
}
