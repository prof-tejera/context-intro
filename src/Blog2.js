import { useContext, useState } from 'react';
import { BlogContext } from './BlogProvider2';

const Footer = () => {
  const { postCount } = useContext(BlogContext);
  return <div className="panel">Total Posts: {postCount}</div>;
};

const Editor = () => {
  const { selectedPost, savePost, closeEditor } = useContext(BlogContext);
  const [title, setTitle] = useState(selectedPost?.title ?? '');
  const [content, setContent] = useState(selectedPost?.content ?? '');

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
        className="primary"
        onClick={() => {
          savePost({
            id: selectedPost?.id,
            title,
            content,
          });
        }}
      >
        Save
      </button>
      <button
        onClick={() => {
          closeEditor();
        }}
      >
        Cancel
      </button>
    </div>
  );
};

const Blog = () => {
  const { posts, openPost, openEditor, deletePost, editorOpen } = useContext(BlogContext);

  return (
    <div>
      <div className="panel">
        <div className="header">
          <div className="text">Posts</div>
          <button onClick={() => openEditor()}>+</button>
        </div>
        {posts.map(p => (
          <div key={p.id}>
            <div style={{ backgroundColor: '#f2f2f2', padding: 20, marginBottom: 20 }}>
              <div style={{ display: 'flex', marginBottom: 10 }}>
                <div className="text" style={{ flex: 1 }}>
                  <b>{p.title}</b>
                </div>
                <button onClick={() => openPost({ id: p.id })} className="primary">
                  Edit
                </button>
                <button
                  onClick={() => {
                    deletePost({ id: p.id });
                  }}
                  className="danger"
                >
                  Delete
                </button>
              </div>
              <div dangerouslySetInnerHTML={{ __html: p.content }} />
            </div>
          </div>
        ))}
      </div>
      {editorOpen && <Editor />}
      <Footer postCount={posts.length} />
    </div>
  );
};

export default Blog;
