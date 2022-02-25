import React, { Component } from "react";
import { Link, useParams,useSearchParams } from "react-router-dom";
import GiftServices from "../services/GiftServices";
import { createBrowserHistory } from "history";





class ListGift extends Component {
    constructor(props){
        super(props)
        
        this.state={
            gifts:[],
            countOfGift:5,
            numberPage:1,

        }
       
    
    }

    componentDidMount(){
        GiftServices.getGiftsWithParam(this.state.countOfGift,this.state.numberPage).then((res)=>{
            this.setState({gifts:res.data})

        });
        
        
    }

    addGift=()=>{
        const history = createBrowserHistory();
        history.push('/add-gift')

    }
    editGift=(id)=>{
       // const params = useParams();
      //  const [searchParams, setSearchParams] = useSearchParams();
       // console.log(params.id);
      
       const history = createBrowserHistory();
        history.push(`/update-gift/${id}`);

    }


    countOfGidtOnPage=(event)=>{
        let newCountOfProdcut=event.target.value;
        this.setState({countOfGift:newCountOfProdcut})
        GiftServices.getGiftsWithParam(newCountOfProdcut,this.state.numberPage).then(res=>{
            this.setState({gifts:res.data})

        });
    
    }

    loadGiftsFromDb=(numberPage)=>{
        GiftServices.getGiftsWithParam(this.state.countOfGift,numberPage).then(res=>{
            if(res.data==0){
                
                this.setState({numberPage:numberPage-1})
                return;
            
            }
            
            this.setState({gifts:res.data})
            
        });

    }

    loadNextGift=()=>{
        let numberPage=this.state.numberPage;
        let newPage=numberPage+1;
        this.setState({numberPage:newPage});
        this.loadGiftsFromDb(numberPage);
    }

    loadPrevGift=()=>{
        let numberPage=this.state.numberPage;
        let newPage;
        if(numberPage==1){
            newPage=numberPage;

        }else{
            newPage=numberPage-1;

        }
        console.log(newPage);
        
        this.setState({numberPage:newPage});
        this.loadGiftsFromDb(numberPage);
    }

    render(){
        return(
            <div>
                
                <h2 className="name-of-table">List of Gifts</h2>
                <div className = "row">
                     <input type="button" className="btn btn-primary" onClick={this.addGift} value='Add Gift'/>
                
                 </div>
                
                 <div className="row">
                 <select value={this.state.countOfGift} class="form-select" aria-label="Default select example" onChange={this.countOfGidtOnPage}>
                    <option selected value="5">5</option>
                    <option value='10'>10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                 </select>
                 

                 </div>
                 
                

                <div className="row">
                    <table className="table table-striped table-bordered">
                        



                        <thead>
                            <tr>
                                <th>Gift name</th>
                                <th>Discription</th>
                                <th>Price</th>
                                <th>Duration</th>
                                <th>Create date</th>
                                <th>Last update date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.gifts.map(
                                    gift=>
                                    <tr key={gift.id}>
                                        <td>{gift.name}</td>
                                        <td>{gift.discription}</td>
                                        <td>{gift.price}</td>
                                        <td>{gift.duration}</td>
                                        <td>{gift.createDate}</td>
                                        <td>{gift.lastUpdateDate}</td>
                                        <td>
                                            <Link className="btn btn-info" to={`/update-gift/${gift.id}`}>Edit</Link>
                                            <Link className="btn btn-danger" to={`/delete-gift/${gift.id}`}>Delete</Link> 
                                
                                            <Link className="btn btn-info" to={`/cart?id=${gift.id}`}>In cart</Link>
                                        </td>
                                
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>

                    <input type='button' className="btn btn-info" onClick={this.loadPrevGift} value='Load prev'/>
                    <input type='button' className="btn btn-info" onClick={this.loadNextGift} value='Load next'/>
                    
                </div>


            </div>

        )
    }
}

export default ListGift