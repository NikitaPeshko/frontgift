import React,{Component} from "react";


class HeaderComponent extends Component{
    constructor(props){
        super(props)


        this.state={
           

        }
    }


    render(){
        return(
            <div>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark justify-content-between">
                   <div><p className="navbar-brand">Gift Certificate System</p></div> 
                   <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Log in</button>
                   
   
                </nav>

            </div>

        )
    }

}



export default HeaderComponent