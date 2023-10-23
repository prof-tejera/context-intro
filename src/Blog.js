import { useContext, useState } from 'react';
import { BlogContext } from './BlogProvider';

const Footer = () => {
  const { posts } = useContext(BlogContext);
  return <div className="panel">Total Posts: {posts.length}</div>;
};

const Editor = () => {
  const { selected: post, setSelected, updatePost, createPost } = useContext(BlogContext);

  const [title, setTitle] = useState(post.title ?? '');
  const [content, setContent] = useState(post.content ?? '');

  return (
    <div className="panel">
      <input
        placeholder="title..."
        className="input"
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="content..."
        className="textarea"
        value={content}
        onChange={e => {
          setContent(e.target.value);
        }}
      />
      <button
        style={{ flex: 1 }}
        className="primary"
        onClick={() => {
          if (post.id) {
            updatePost({
              id: post.id,
              title,
              content,
            });
          } else {
            createPost({
              title,
              content,
            });
          }

          setSelected(null);
        }}
      >
        Save
      </button>
    </div>
  );
};

const Posts = () => {
  const { posts, deletePost, setSelected } = useContext(BlogContext);

  return posts.map(p => (
    <div key={p.id}>
      <div style={{ backgroundColor: '#f2f2f2', padding: 20, marginBottom: 20 }}>
        <div style={{ display: 'flex' }}>
          <div className="text" style={{ flex: 1 }}>
            {p.title}
          </div>
          <button onClick={() => setSelected(p)} className="primary">
            Edit
          </button>
          <button
            onClick={() => {
              deletePost(p.id);
            }}
            className="danger"
          >
            Delete
          </button>
        </div>
        <div
          style={{ padding: '10px 0px' }}
          dangerouslySetInnerHTML={{
            __html: p.content,
          }}
        />
      </div>
    </div>
  ));
};

const Blog = () => {
  const { selected, setSelected } = useContext(BlogContext);

  return (
    <div>
      <div className="panel">
        <div className="header">
          <div className="text">Posts</div>
          <button onClick={() => setSelected({})}>+</button>
        </div>
        <Posts />
      </div>
      <Footer />
      {selected && <Editor />}
    </div>
  );
};

export default Blog;
