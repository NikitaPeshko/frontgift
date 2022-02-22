import React,{Component} from "react";
import { createBrowserHistory } from "history";
import GiftServices from "../services/GiftServices";
import TagComponent from "./TagComponent";



class AddGiftComponent extends Component{
    constructor(props) {
        super(props)

        this.state = {

         
            name: '',
            discription: '',
            price: '',
            duration:'',
            createDate:'',
            lastUpdateDate:'',
            tags:[],
            currentTag:'',

        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeDiscriptionHandler = this.changeDiscriptionHandler.bind(this);
      
    }

    saveGift = (e) => {
        e.preventDefault();
        let gift = {name: this.state.name, discription: this.state.discription, price: this.state.price, duration: this.state.duration,
            createDate: this.state.createDate, lastUpdateDate: this.state.lastUpdateDate,listOfTag:this.state.currentTag};
        console.log('gift => ' + JSON.stringify(gift));

        GiftServices.addGift(gift).then(res=>{
            const history = createBrowserHistory();
            history.push('/gifts');
        });
    }

 
   
    
    changeNameHandler= (event) => {
        this.state.createDate=new Date();
        this.state.lastUpdateDate=new Date();
        
        this.setState({name: event.target.value});
    }

    changeDiscriptionHandler= (event) => {
        this.setState({discription: event.target.value});
    }

    changePriceHandler= (event) => {
        this.setState({price: event.target.value});
    }


    changeDurationHandler= (event) => {
        this.setState({duration: event.target.value});
    }


    changeTagHandler= (event) => {
        this.setState({currentTag: event.target.value});
        console.log(this.state.currentTag);
    }

    addTag(){
        let curtag=this.state.currentTag;
        console.log(curtag);
        // let masTag=this.state.tags.slice();
        // console.log(masTag);
        // masTag.push(curtag);
        // console.log(masTag);
        let masTag=this.state.tags;
        masTag.push(curtag);
         console.log(masTag);
        this.setState({tags:masTag})
    
        console.log(this.state.tags);


    }

    cancel(){
        const history = createBrowserHistory();
        history.push('/gifts')
      
    }

    
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Add gift</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Name: </label>
                                            <input placeholder="Name" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Discription: </label>
                                            <input placeholder="discription" name="discription" className="form-control" 
                                                value={this.state.discription} onChange={this.changeDiscriptionHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Price: </label>
                                            <input placeholder="Price" name="price" className="form-control" 
                                                value={this.state.price} onChange={this.changePriceHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Duration: </label>
                                            <input placeholder="Duration:exp 5" name="duration" className="form-control" 
                                                value={this.state.duration} onChange={this.changeDurationHandler}/>
                                        </div>


                                        <div className = "form-group">
                                            <label> Tag name: </label>
                                            <input placeholder="tag name" name="tag" className="form-control" 
                                                value={this.state.currentTag} onChange={this.changeTagHandler}/>

                                            <input type="button" onClick={this.addTag.bind(this)} value="Отправить" />
                                               
                                    
                                        </div>
                                        <div>
                                    
                                            {this.state.tags.map(tag=>{
                                                
                                                return <TagComponent tag={tag}/>
                                                
                                            })}
                                            
                                        </div>

                                       

                                        <button className="btn btn-success" onClick={this.saveGift}>Save</button>
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



export default AddGiftComponent