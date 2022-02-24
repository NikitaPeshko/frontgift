import React,{Component} from "react";
import { createBrowserHistory } from "history";


class HeaderComponent extends Component{
    constructor(props){
        super(props)


        this.state={
           

        }
    }

    openLoginPage=()=>{
        const history=createBrowserHistory();
        history.push('/login');
        history.go('/login');

    }


    render(){
        return(
            <div>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark justify-content-between">
                   <div><p className="navbar-brand">Gift Certificate System</p></div> 
                   <input type="button" class="btn btn-outline-success my-2 my-sm-0" onClick={this.openLoginPage} value='Log in'/>
                   
   
                </nav>

            </div>

        )
    }

}



export default HeaderComponent