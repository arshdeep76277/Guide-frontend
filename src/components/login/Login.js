import axios from "axios";
import './login.css'
const Login =({setUser})=>{
    const userLogin=(e)=>{
        e.preventDefault();
        axios.post('https://blog-site-backend-001.herokuapp.com/api/auth/login',{email:e.target.email.value,password:e.target.password.value})
        .then(response=>{
            if(response.status===200){
                localStorage.setItem('userData',JSON.stringify(response.data));
                setUser(response.data.userId);
             }
             else alert(response.data)
        }).catch(err=>{alert(err.response.data.msg)});
    }
    const userRegister=(e)=>{
        e.preventDefault();
        axios.post('https://blog-site-backend-001.herokuapp.com/api/auth/register',{
            email:e.target.email.value,
            password:e.target.password.value,
            name:e.target.name.value
        }).then(response=>{
            if(response.status===200){
                localStorage.setItem('userData',JSON.stringify(response.data));
                setUser(response.data.userId);
             }
        }).catch(err=>{alert(err.response.data.msg)});
    }
   return (
    <div className="main-container">
    <div className="login-container container">
        <form className="form" onSubmit={userLogin}>
           <input type="email"  placeholder="email" name="email" className=" input login-email" required/>
           <input type="password" placeholder="password" name="password" className="input login-password" required/>
           <button type="submit" className="button login-button" >Login</button>
        </form>
    </div>
    <div className="register-container container">
         <form className="form" onSubmit={userRegister}>
          <input type="email" placeholder="email" name="email" required className="input register-email"/>
          <input type="text" placeholder="username" name="name" required className="input register-username"/>
          <input type="password" placeholder="password" required name="password" className="input register-password"/>
          <button type="submit" className=" button register-button" >Register</button>
          </form>
      </div>
</div>
   )
}
export default Login;


  