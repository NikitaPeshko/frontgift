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

        alert(`Вы уверены что хотите удалить ${this.props.tag}`);
        this.setState({class: 'deleted-tag '.concat(this.state.class)});
        
        

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