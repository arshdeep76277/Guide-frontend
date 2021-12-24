import axios from "axios";
import "./addNewBlog.css";
const AddNewBlog=()=>{
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(e.target.title.value,e.target.description.value);
        const userId=JSON.parse(localStorage.getItem("userData")).userId;
        const token=JSON.parse(localStorage.getItem("userData")).token;
        const username=JSON.parse(localStorage.getItem("userData")).username;
        axios.post("https://blog-site-backend-001.herokuapp.com/api/db/create",
        {
            userId,
            token,
            username,
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
        e.target.title.value="";
        e.target.description.value="";
    }
    return (
    <div className="main--container">
           <form className="form--container" onSubmit={handleSubmit}>
               <input type="text" required name="title" className="input addnew--title"/>
               <textarea type="description" required name="description" className="input text-area addnew--description"/>
               <button type="submit" className="btn btn--black">Submit</button>
           </form>
    </div>
    )
}
export default AddNewBlog;