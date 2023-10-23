import React, { useEffect, useState } from 'react';
import { makeId } from './util';

export const BlogContext = React.createContext({});

const useLocalJson = ({ storageKey, fallbackValue }) => {
  const [value, setValue] = useState(() => {
    const storedValue = window.localStorage.getItem(storageKey);

    if (!storedValue) {
      return fallbackValue;
    }

    return JSON.parse(storedValue);
  });

  useEffect(() => {
    if (value) {
      window.localStorage.setItem(storageKey, JSON.stringify(value));
    } else {
      window.localStorage.removeItem(storageKey);
    }
  }, [storageKey, value]);

  return [value, setValue];
};

const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useLocalJson({ storageKey: 'react-blog', fallbackValue: [] });
  const [selected, setSelected] = useState(null);

  return (
    <BlogContext.Provider
      value={{
        posts,
        createPost: ({ title, content }) => {
          const id = makeId();
          const newPost = { id, title, content };
          setPosts([...posts, newPost]);
          return newPost;
        },
        updatePost: post => {
          const updatedPosts = posts.map(p => (p.id === post.id ? post : p));
          setPosts(updatedPosts);
        },
        deletePost: id => setPosts(posts.filter(p => p.id !== id)),
        selected,
        setSelected,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default BlogProvider;
