import React,{Component} from "react";
import { createBrowserHistory } from "history";
import { Link } from "react-router-dom";


class HeaderComponent extends Component{
    constructor(props){
        super(props)


        this.state={
            logOutButton:true,
            logInButton:true,
           

        }
    }

    componentDidMount(){
        if(localStorage.getItem("jwtToken")==null){
            this.setState({
                logOutButton:false,
                logInButton:true,
            })

        }else{
            this.setState({
                logOutButton:true,
                logInButton:false,
            })

        }

    }

    openLoginPage=()=>{
        const history=createBrowserHistory();
        history.push('/login');
        history.go('/login');

    }
    logOut=()=>{
        const history=createBrowserHistory();
        history.push('/');
        history.go('/');
        localStorage.removeItem('jwtToken');

    }


    


    render(){
        return(
            <div>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark justify-content-between">
                   <div><p className="navbar-brand">Gift Certificate System</p></div> 
                   
                   <div>
                       {this.state.logInButton &&
                        <input type="button" class="btn btn-outline-success my-2 my-sm-0" onClick={this.openLoginPage} value='Log in'/>}
                        
                        {this.state.logOutButton &&
                        <input type="button" class="btn btn-outline-success my-2 my-sm-0" onClick={this.logOut} value='Log out'/>}
                        <Link className="btn btn-info" to={'/cart'}>Cart</Link>
                   </div>
                  
                   
   
                </nav>

            </div>

        )
    }

}



export default HeaderComponent