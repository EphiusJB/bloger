import React from 'react'
import './components.css';

export default function Post({post}) {
    

    return (
        <>
        <div className="post">
                <div key={post.id} className="post-item">
                    <h2 className='post-title'>{post.title}</h2>
                    <p>{post.createdAt.toDate().toLocaleString("en-US", {year: "numeric", month:"long", day:"numeric"})}</p>
                    <p>{post.summary} <a href="#">read more</a></p>
                    <div className="bottomPanel">
                    <p>By: {post.authorName}</p>
                    <div className="rightSide">
                    <p>Likes: {post.likesCount}</p>
                    <p>Comments: {post.commentsCount}</p>
                    <button className="share">Share</button>
                    </div>
                    </div>
                </div>
                <hr />
        </div>
        </>
    )
}
