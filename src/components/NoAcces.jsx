import React,{Component} from "react";
import { Link } from 'react-router-dom';


class NoAcces extends Component{
    constructor(props){
        super(props)


        this.state={
           

        }
    }


    render(){
        return(
            <div>
                <span className="page-not-found">You dont have access to this page</span>
                <br></br>
                <Link to="/">Go Home</Link>
            </div>

        )
    }

}



export default NoAcces