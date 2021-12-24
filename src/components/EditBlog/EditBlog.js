import {useParams} from 'react-router-dom'
import { useState,useEffect} from 'react';
import axios from 'axios';
const EditBlog=()=>{
    const {blogId}=useParams();
    const [blogData,setBlogData]=useState({});
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        axios.get('https://blog-site-backend-001.herokuapp.com/api/db/blogs/'+blogId).then(res=>{
            if(res.status===200){
                 setBlogData(blogData=>({...blogData,...res.data}));
                 setLoading(false);
            }
        }).catch((err)=>{alert(err.response.data)});
    },[]);
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(e.target.title.value,e.target.description.value);
        const userId=JSON.parse(localStorage.getItem("userData")).userId;
        const token=JSON.parse(localStorage.getItem("userData")).token;
        axios.put("https://blog-site-backend-001.herokuapp.com/api/db/update/"+blogId,
        {
            userId,
            token,
            title:e.target.title.value,
            description:e.target.description.value
        },
        {
            headers:{
                'Authorization':'Bearer '+token
            }
        }).then(res=>{
            if(res.status==200){
                alert(res.data.msg);
                console.log(res.data);
            }
        }).catch(err=>{console.log("post not created"); alert(err.response.data.msg)});
    }
    const changeTitle=(e)=>{
        setBlogData(blogData=>({...blogData,title:e.target.value}));
    }
    const changeDescription=(e)=>{
        setBlogData(blogData=>({...blogData,description:e.target.value}));
    }
    if(loading) return <div>Loading...</div>
    return (
        <div className="main--container">
           <form className="form--container" onSubmit={handleSubmit}>
               <input type="text" required name="title" value={blogData.title} onChange={(e)=>changeTitle(e,)} className="input addnew--title"/>
               <textarea type="description" required name="description" onChange={(e)=>changeDescription(e)} value={blogData.description} className="input text-area addnew-description"/>
               <button type="submit" className="btn btn--black">Submit</button>
           </form>
    </div>
    )
}
export default EditBlog;