import axios from "axios";
import { useEffect,useState } from "react";
import "./home.css";
import Error from "../Error/Error";
import {BrowserRouter as Router,Route,Link,Outlet, Routes, useParams} from "react-router-dom";
import Blogs from "../Blogs/Blogs";
import AddNewBlog from "../Blogs/AddNewBlog";
import EditBlog from "../EditBlog/EditBlog";
const Home=()=>{
    const findUser=(e)=>{
        e.preventDefault();
        // this functionality is pending
    }
    const logout=()=>{
        localStorage.removeItem("userData");
        window.location.reload();
    }
    const user=JSON.parse(localStorage.getItem("userData")).userId;
    return (
        <Router>
            <div className="main--container">
            <div className="navbar">
                 <Link to="/"><heading className="navbar--heading">Guide</heading></Link>
                {user!=null && <div className="navbar--options">
                    <form className="navbar--search--form">
                      <input type="text" name="userName" required className="navbar--form--input"/>
                      <button className="btn btn--black navbar--form--submit" type="submit">Search</button>
                    </form>
                 <Link to="/addNew" className="btn btn--green">Add New</Link>
                 <button className="btn btn--danger" onClick={logout}>Logout</button>
                 </div>
                 }
             </div>
             <Outlet/>
             <Routes>
                 <Route path="/" element={<Blogs/>}/>
                 <Route path="/addNew" element={<AddNewBlog/>}/>
                 <Route path="/blog/:id" element={<Blog />}/>
                 <Route path="/blog/edit/:blogId" element={<EditBlog />}/>
             </Routes> 
            </div>
        </Router>
    )
}
const Blog=()=>{
    const {id} =useParams();
    const [loading,setLoading]=useState(true);
    const [blogData,setBlogData]=useState({});
    const userId=JSON.parse(localStorage.getItem("userData")).userId;
    useEffect(()=>{
        axios.get('https://blog-site-backend-001.herokuapp.com/api/db/blogs/'+id).then(res=>{
            if(res.status===200){
                 setBlogData(blogData=>({...blogData,...res.data}));
                 setLoading(false);
            }
        }).catch((err)=>{alert(err.response.data)});
    },[]);
    
    const deleteBlog=(blogId,userId)=>{
          const token=JSON.parse(localStorage.getItem("userData")).token;
          axios.delete("https://blog-site-backend-001.herokuapp.com/api/db/"+blogId,
            {
                headers:{
                    'Authorization': 'Bearer '+token,
                },
                data:{
                    userId
                }
            }).then((res)=>{
                console.log(res.data);
                if(res.status===200){
                    alert(res.data.msg);
                    setBlogData("");
                }
            }).catch(err=>{console.log(err.response); alert(err.response.data)});
    }
    if(loading)  return  <div className="center"><h1>Loading ...</h1></div>
    return (
    <div className="blog--container">
            <div className="blog--title">
                <p className="blog--title--info">{blogData.title}</p>
                {blogData.userId===userId ? 
                <div>
                    <button className="btn delete--btn btn--danger btn--small" onClick={()=>deleteBlog(blogData._id,userId)}>Delete</button>
                    <Link to={"/blog/edit/"+blogData._id} className="btn btn--green btn--small">Edit</Link>
                    </div> : ("") }
            </div>
            <div className="blog--description">
                {blogData.description}
            </div>
    </div>
    )
}
export default Home;