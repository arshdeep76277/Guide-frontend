import { useEffect,useState } from "react";
import axios from "axios";
import { Routes, Route ,Link,useParams, Outlet} from "react-router-dom";
import "./blog.css";
const Blogs=()=>{
    const [blogs,setBlogs]=useState([]);
    const [loading,setLoading]=useState(true);
    let flag=false;
    const user=JSON.parse(localStorage.getItem("userData")).userId;
    useEffect(()=>{
        setBlogs([]);
        const token=JSON.parse(localStorage.getItem("userData")).token;
         axios.get("https://blog-site-backend-001.herokuapp.com/api/db/"+user,{headers:{
            'Authorization':'Bearer '+token
        }}).then(res=>{
            if(res.status===200){
                 setBlogs(blog=>[...blog,...res.data]);
                 setLoading(false);
            }
        }).catch(err=>{flag=true; alert(err.response.data)});
    },[]);

    if(loading) return <div> Loading...</div>
    else return (
        <div className="blogs--container">
             {
                blogs.map((blog,index)=> <Link className="blog"  key={blog._id} to={`/blog/${blog._id}`}>{index+1+"."} {blog.title}</Link> )
             }
       </div>
 )
}

export default Blogs;