import React from 'react'
import Nav from './nav'
import Post from './post'

export default function Home({auth, user, posts}) {
    

    return (
        <>
        <div className="home">
           <Nav auth={auth} user={user}/>
            <div className="home-content">
                <div className="topMenu">
                    <div className="opt">Everything</div>
                    <div className="opt">Trending</div>
                    <div className="opt">Following</div>
                </div>
                <div className="content">
                        {posts.map((post) => (
                            <Post post={post} />
                        ))}
                </div>
            </div>
            <div className="home-sidebar">
                <h2>Sidebar</h2>
                <p>This is the sidebar content.</p>
                <p>You can add links, ads, or any other content here.</p>
            </div>
        </div>
        </>
    )
}
