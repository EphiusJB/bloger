import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuidv4} from "uuid";
import { useState } from "react";

/**
 * Hook to create a new post
 */

export const useCreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPost = async ({
    title,
    content,
    summary,
    author
  }) => {
    if (!author) {
      setError("User not authenticated");
      return;
    }
    setLoading(true);
    setError(null);

    try {
        const postId = uuidv4();
        const postRef = doc(db, "posts", postId);
        // Create a unique slug for the post
        const slug = title
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, "");

      await setDoc((postRef), {
        postId,
        title,
        slug,
        content,
        summary,
        published: true,
        authorId: author.uid,
        authorName: author.displayName,
        likesCount: 0,
        commentsCount: 0,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      setError(error);
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return { createPost, loading, error };
}