import React, { useState } from 'react';
import { makeId } from './util';

export const BlogContext = React.createContext({});

const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  const closeEditor = () => {
    setSelectedPost(null);
  };

  return (
    <BlogContext.Provider
      value={{
        posts,
        editorOpen: !!selectedPost,
        selectedPost,
        closeEditor,
        postCount: posts.length,
        deletePost: ({ id }) => setPosts(posts.filter(x => x.id !== id)),
        openEditor: () => setSelectedPost({}),
        openPost: ({ id }) => {
          const p = posts.find(p => p.id === id);
          setSelectedPost(p);
        },
        savePost: ({ id, title, content }) => {
          const updatedPost = {
            id,
            title,
            content,
          };

          if (id) {
            // Updating existing post
            const updatedPosts = posts.map(p => (p.id === id ? updatedPost : p));
            setPosts(updatedPosts);
          } else {
            // Creating a new one
            setPosts([
              ...posts,
              {
                ...updatedPost,
                id: makeId(),
              },
            ]);
          }

          closeEditor();
        },
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default BlogProvider;
