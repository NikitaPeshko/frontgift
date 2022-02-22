import React,{Component} from "react";
import { Link } from 'react-router-dom';


class TagComponent extends Component{
    constructor(props){
        super(props)


        this.state={
            class:'delete-tag',
            count:0,
            
           

        }
    }

    deleteTag=()=>{

        alert(`Hello ${this.props.tag}`);
        this.setState({class: 'deleted-tag '.concat(this.state.class)});
        this.setState({count:1});
        

    }

    

    render(){
        return(
            
            
            <div>
                
                
                <p className={this.state.class}>{this.props.tag}<span onClick={this.deleteTag} className={this.state.class}>&#10006;</span></p> 
                
            
            </div>

        )
    }

}

export default TagComponent