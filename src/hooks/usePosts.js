import { useState, useEffect } from "react";
import { collection, query,where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const usePost = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const q = query(
                    collection(db, "posts"),
                    where("published", "==", true),
                    orderBy("createdAt", "desc")
                );
                const querySnapshot = await getDocs(q);
                const postsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log(postsData);
                setPosts(postsData);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [])

    return { posts, loading };
}