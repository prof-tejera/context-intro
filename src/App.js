import Blog2 from './Blog2';
import BlogProvider from './BlogProvider2';

const App = () => {
  return (
    <BlogProvider>
      <Blog2 />
    </BlogProvider>
  );
};

export default App;
