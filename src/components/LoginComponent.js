
import React, { useState } from "react";
import authToken from "../auth/authToken";
import GiftServices from "../services/GiftServices";
import Loader from "./Loader";
import { createBrowserHistory } from "history";
import UserService from "../services/UserService";


const LoginComponent=()=>{


    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [loader,setLoader]=useState(false);
    const [loginOrPasswordIncorect,setLoginOrPasswordIncorect]=useState(true);




    

    function logIn (event)  {
        let credentials={
            login:login,
            password:password
        }
        console.log(credentials);
        GiftServices.authantification(credentials).then(res=>{
            let token=res.data.token;
            //alert(token);
            if(token!==undefined){
                localStorage.setItem('userLogin',login)
                localStorage.setItem('jwtToken', token)
                console.log(token);
                authToken(token);
                

                

                
                const history=createBrowserHistory();
                history.push('/gifts');
                history.go();

            }else{
                setLoginOrPasswordIncorect('');

            }
            
            
        }).catch(err=>{
            setLoginOrPasswordIncorect('');
            
        });
       
 
     }

     


     function changeLoginHandler(event) { 
        
        setLogin(event.target.value);
    }

    function changePasswordHandler(event) {
        setPassword(event.target.value);
    }




    
        return(
            <div>
            <br></br>
               <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Log In</h3>
                            <h4 hidden={loginOrPasswordIncorect} style={{color:'red',textAlign:"center"}}>Login or password incorrect</h4>
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label> Name: </label>
                                        <input placeholder="login" name="login" className="form-control" 
                                            value={login} onChange={changeLoginHandler} required/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Password: </label>
                                        <input placeholder="password" name="password" className="form-control" 
                                            value={password} onChange={changePasswordHandler} minLength='4' required/>
                                    </div>
                                  
    

                                    <input type='button' className="btn btn-success" onClick={logIn} value='Log in'/>
                                   
                                    <div className="loader-on-update">
                                       {loader && <Loader/>}
                                    </div>
                                    
                                </form>
                            </div>
                        </div>
                    </div>

               </div>
        </div>

        )
    




}

export default LoginComponent