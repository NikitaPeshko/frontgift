import React,{Component} from "react";
import { createBrowserHistory } from "history";
import GiftServices from "../services/GiftServices";
import TagComponent from "./TagComponent";
import UserService from "../services/UserService";



class AddUsersComponent extends Component{
    constructor(props) {
        super(props)

        this.state = {

         
            name: '',
            login:'',
            password:'',
            email:'',
            loginAlreadyExist:'true'

        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        
      
    }

    saveGift = (e) => {
        e.preventDefault();
        let credentials={
            login:this.state.login,
            email:this.state.email,
            name:this.state.name,
            password:this.state.password,

        };

        UserService.registrationUser(credentials).then(res=>{
            
            console.log(res.data);
            if(res.data=="OK"){
                alert("Registration succes");
                const history = createBrowserHistory();
                history.push('/gifts');
                history.go('/gifts');
            }else{
                this.setState({loginAlreadyExist:""});
            }

        }).catch((err)=>{
                
                console.log("AXIOS: " +  err);
                alert(err)
              });
    }

 
   
    
    changeNameHandler= (event) => {
        this.state.createDate=new Date();
        this.state.lastUpdateDate=new Date();
        
        this.setState({name: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({email: event.target.value});
    }

    changeLoginHandler= (event) => {
        this.setState({login: event.target.value});
    }


    changePasswordHandler= (event) => {
        this.setState({password: event.target.value});
    }

    cancel(){
        const history = createBrowserHistory();
        history.push('/gifts');
        history.go('/gifts'); 
    }
  
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Registration</h3>
                                <h4 hidden={this.state.loginAlreadyExist} style={{color:"red",
                                          textAlign:"center"}}>This login already use</h4>
                                <div className = "card-body">
                                    <form onSubmit={this.saveGift}>
                                        <div className = "form-group">
                                            <label> Name: </label>
                                            <input placeholder="Name"  name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler} required/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email: </label>
                                            <input type='email' placeholder="temp@gmail.com" name="discription" className="form-control" 
                                                value={this.state.email} onChange={this.changeEmailHandler} required/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Login: </label>
                                            <input placeholder="login" name="price" className="form-control" 
                                                value={this.state.login} onChange={this.changeLoginHandler} required/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Password: </label>
                                            <input type='password' placeholder="password" name="duration" className="form-control" 
                                                value={this.state.password} onChange={this.changePasswordHandler} minLength="4" required/>
                                        </div>

                                       
                                        <input type='submit' className="btn btn-success" value='Save'/>
                                        
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}



export default AddUsersComponent