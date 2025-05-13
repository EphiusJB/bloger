import React from 'react'
import Nav from './nav'
import Post from './post'

export default function Home({auth, user, posts}) {
    

    return (
        <>
           <Nav auth={auth} user={user}/>
        <div className="home">
            <div className="home-sidebar">
                <div className="topMenu">
                    <div className="opt">Everything</div>
                    <div className="opt">Trending</div>
                    <div className="opt">Following</div>
                </div>
            </div>
            <div className="home-content">
                <div className="content">
                        {posts.map((post) => (
                            <Post key={post.id} post={post} />
                        ))}
                </div>
            </div>
        </div>
        </>
    )
}
