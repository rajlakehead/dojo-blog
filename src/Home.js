import { useEffect, useState } from "react";
import BlogList from "./BlogList";

const Home = () => {
  const [blogs, setBlogs] = useState(null);
  const [isPending, setPending] = useState(true);
  const [error, setError] = useState(null);

  const handleDelete = (id) => {
    const newBlogs = blogs.filter(blog => blog.id !== id);
    setBlogs(newBlogs);
  }

  useEffect(() => {
    fetch('http://localhost:8000/blogs')
    .then(res => {
      if(!res.ok){
        throw Error("Could not fetch the data");
      }
        return res.json();
    })
    .then(data => {
        setBlogs(data);
        setPending(false);
        setError(null);
    }).catch(err =>{
      setPending(false);
      setError(err.message);
    })

  }, []);

  return (
    <div className="home">
      {error && <div>{ error }</div>}
      {isPending && <div>Loading.....</div>}
      {blogs && <BlogList blogs={blogs} title="All Blogs" handleDelete={handleDelete} />}
    </div>
  );
}
 
export default Home;