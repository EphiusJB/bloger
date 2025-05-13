import React, { useState } from 'react'
import { useCreatePost } from '../hooks/useCreatePost';

export default function AddPost({isOpen, onclose, auth}) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [summary, setSummary] = useState("");

    const {createPost, loading, error} = useCreatePost();

    const handleSubmit = async (e) => {
        // Handle form submission logic here
        try {
            await createPost({
                title,
                content,
                summary,
                author: auth.currentUser
            });
            // Reset form fields
            setTitle("");
            setContent("");
            setSummary("");
            // Optionally, you can redirect or show a success message
            console.log("Post submitted:", { title, content });
            onclose();
        } catch (error) {
            console.error("Error submitting post:", error);
            // Optionally, you can show an error message to the user
            
        }
    };
    if(!isOpen) return null;

    return (
        <>
            <div className="addPost">
                <h1>Add Post</h1>
                <form action={handleSubmit}>
                    <input type="text" placeholder="Title" value={title} onChange={(e)=> setTitle(e.target.value)}/>

                    <input type="text" placeholder="Summary" value={summary} onChange={(e)=> setSummary(e.target.value)}/>

                    <textarea placeholder="Content" value={content} onChange={(e)=> setContent(e.target.value)}></textarea>
                    <button type="submit" disabled={loading}>{loading ? "Posting..." : "Add Post"}</button>
                </form>
            </div>
            
        </>
    )
}
