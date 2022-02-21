import React,{Component} from "react";
import { Link } from 'react-router-dom';


class ErrorComponent extends Component{
    constructor(props){
        super(props)


        this.state={
           

        }
    }


    render(){
        return(
            <div>
                <span className="page-not-found">404 Page NOT FOUND</span>
                <br></br>
                <Link to="/">Go Home</Link>
            </div>

        )
    }

}



export default ErrorComponent