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
            dirtyName:false,
            errorName:"Name cant be blank",
            login:'',
            dirtyLogin:false,
            errorLogin:"Login cant be blank",
            password:'',
            dirtyPassword:false,
            errorPassword:"Password cant be blank",
            email:'',
            dirtyEmail:false,
            errorEmail:"Email cant be blank",
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
        if (this.state.name.length<2){
            this.setState({dirtyName:true})
            return false;
        }
        if (this.state.email.length<3){
            this.setState({dirtyEmail:true})
            return false;
        }
        if (this.state.login.length<4){
            this.setState({dirtyLogin:true})
            return false;
        }
        if (this.state.password.length<4){
            this.setState({dirtyPassword:true})
            return false;
        }
        

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
        if(event.target.value.length<2 || event.target.value.length>20){
            this.setState({errorName:"Name length cant be less than 2 and more than 20 "})
        }else{
            this.setState({errorName:""});
        }
    }
    

    changeEmailHandler= (event) => {
        this.setState({email: event.target.value});
        const re =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(event.target.value).toLowerCase())){
            this.setState({errorEmail:"Incorrect email see example 'admin@mail.com'"})
        }else{
            this.setState({errorEmail:""});

        }
        
    }

    changeLoginHandler= (event) => {
        this.setState({login: event.target.value});

        if(event.target.value.length<4 || event.target.value.length>20){
            this.setState({errorLogin:"Login length cant be less than 4 and more than 20 "})
        }else{
            this.setState({errorLogin:""});
        }
    }


    changePasswordHandler= (event) => {
        this.setState({password: event.target.value});

        if(event.target.value.length<4 || event.target.value.length>20){
            this.setState({errorPassword:"Password length cant be less than 4 and more than 20 "})
        }else{
            this.setState({errorPassword:""});
        }
    }

    blurHandler= (event) => {
        switch (event.target.name){
            case 'name':
                this.setState({dirtyName:true});
                break;
            case 'login':
                this.setState({dirtyLogin:true});
                break;
            case 'password':
                this.setState({dirtyPassword:true});
                break;
            case 'email':
                this.setState({dirtyEmail:true});
                break;
                

        }
        
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
                                            {(this.state.dirtyName && this.state.errorName) && <div className="error-message" >{this.state.errorName}</div>}
                                            <label> Name: </label>
                                            <input onBlur={e=>this.blurHandler(e)} type='text' placeholder="Name"  name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler} />
                                        </div>
                                        
                                        <div className = "form-group">
                                        {(this.state.dirtyEmail && this.state.errorEmail) && <div className="error-message" >{this.state.errorEmail}</div>}
                                            <label> Email: </label>
                                            <input onBlur={e=>this.blurHandler(e)} type='email' placeholder="temp@gmail.com" name="email" className="form-control" 
                                                value={this.state.email} onChange={this.changeEmailHandler} />
                                        </div>
                                        <div className = "form-group">
                                        {(this.state.dirtyLogin && this.state.errorLogin) && <div className="error-message" >{this.state.errorLogin}</div>}
                                            <label> Login: </label>
                                            <input onBlur={e=>this.blurHandler(e)} placeholder="login" name="login" className="form-control" 
                                                value={this.state.login} onChange={this.changeLoginHandler} />
                                        </div>
                                        <div className = "form-group">
                                        {(this.state.dirtyPassword && this.state.errorPassword) && <div className="error-message" >{this.state.errorPassword}</div>}
                                            <label> Password: </label>
                                            <input onBlur={e=>this.blurHandler(e)} type='password' placeholder="password" name="password" className="form-control" 
                                                value={this.state.password} onChange={this.changePasswordHandler}/>
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