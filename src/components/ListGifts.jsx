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
            giftsInCart:[],
            findFieldValue:'',
            sortingMethod:'asc',
            sortBy:'default',
            sortingStatus:0,    //0-no sorting; 1 - asc ;2 - desc

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClickFind=this.handleClickFind.bind(this);
        this.sorting=this.sorting.bind(this);
       
    
    }

    componentDidMount(){
        GiftServices.getGiftsWithParam(this.state.countOfGift,this.state.numberPage,this.state.sortBy,this.state.sortingMethod).then((res)=>{
            
            this.setState({gifts:res.data})

        });
        
        
    }


    handleChange(event) {
        this.setState({findFieldValue: event.target.value});
           
      }

    handleClickFind(event){
        this.setState({numberPage:1});
        GiftServices.findGiftByName(this.state.findFieldValue,this.state.countOfGift,this.state.numberPage).then(res=>{
            console.log(res.data);
         
            if(res.data.errCode!==undefined){
                alert("No gift with this name");
                return false;
            }
            this.setState({gifts:res.data})
        });
        event.preventDefault();
        
        
    }

    addGift=()=>{
        const history = createBrowserHistory();
        history.push('/add-gift');
        history.go('/add-gift');

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
        GiftServices.getGiftsWithParam(this.state.countOfGift,numberPage,this.state.sortBy,this.state.sortingMethod).then(res=>{
            if(res.data==0){
                
                this.setState({numberPage:numberPage-1})
                return false;
            
            }
            
            this.setState({gifts:res.data})
            
        });

    }

    addTocart=(id,name,price)=>{
        alert(`Succesfully added to cart ${name}`);
        const obj={
            id,
            name,
            price,
        }
        console.log(obj);
      //  let gifts=this.state.giftsInCart;
      //  let gifts=this.state.giftsInCart;
      //  gifts.push(obj);
        //gifts.push(id);
      //  console.log(gifts);
      //  this.setState({giftsInCart:gifts}) ;
      //  console.log(giftInCart);
        let newGift=JSON.stringify(obj);

        let giftInCart=localStorage.getItem("giftInCart");
        console.log(giftInCart);
        newGift=newGift+"|||"+giftInCart;

        

        localStorage.setItem("giftInCart",newGift);
        
       



    }

    loadNextGift=()=>{
        let numberPage=this.state.numberPage;
        let newPage=numberPage+1;
        this.setState({numberPage:newPage});
        this.loadGiftsFromDb(numberPage);
    }

    loadNextGiftWithName=()=>{
        let numberPage=this.state.numberPage;
        let newPage=numberPage+1;
        this.setState({numberPage:newPage});
        GiftServices.findGiftByName(this.state.findFieldValue,this.state.countOfGift,this.state.numberPage).then(res=>{
            console.log(res.data);
         
            if(res.data.errCode!==undefined){
                alert("No gift with this name");
                return false;
            }
            this.setState({gifts:res.data})
        });
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

    loadPrevGiftWithName=()=>{
        let numberPage=this.state.numberPage;
        let newPage;
        if(numberPage==1){
            newPage=numberPage;

        }else{
            newPage=numberPage-1;

        }
        console.log(newPage);
        
        this.setState({numberPage:newPage});
        GiftServices.findGiftByName(this.state.findFieldValue,this.state.countOfGift,this.state.numberPage).then(res=>{
            console.log(res.data);
         
            if(res.data.errCode!==undefined){
                alert("No gift with this name");
                return false;
            }
            this.setState({gifts:res.data})
        });
        
    }
    deleteGift(id){
        alert(`Are you sure id=${id}?`);
        GiftServices.deleteGift(id).then(res=>{
            alert("Succsesfully deleted")
        }).catch((err)=>{
            
            const history = createBrowserHistory();
            history.push('/noacces');
            history.go('/noacces');
            console.log("AXIOS: " +  err);
            alert(err)
          });

    }

    sorting(event){
        
        switch (this.state.sortingStatus) {
            case 0:
                {
                    event.target.style.backgroundColor='white';
                    
                    this.setState({sortingStatus:1});
                    this.setState({sortBy:'name'});
                    this.setState({sortingMethod:"asc"});
                 //   alert(this.state.sortingStatus);
                    this.loadGiftsFromDb(this.state.numberPage);

                }
              
              break;
            case 1:{
                event.target.style.backgroundColor='red';
                
                this.setState({sortingStatus:2});
                this.setState({sortBy:'name'});
                this.setState({sortingMethod:"desc"});
              //  alert(this.state.sortingStatus);
                this.loadGiftsFromDb(this.state.numberPage);
            }
              
              break;
            case 2:{
                event.target.style.backgroundColor='yellow';
                
                this.setState({sortingStatus:0});
                this.setState({sortBy:'default'});
                this.setState({sortingMethod:"asc"});
           //     alert(this.state.sortingStatus);
                this.loadGiftsFromDb(this.state.numberPage);
            }
              
              break;
            
          }

    }

    render(){
        return(
            <div>
                
                <h2 className="name-of-table">List of Gifts</h2>
                <div className = "row">
                     <input type="button" className="btn btn-primary" onClick={this.addGift} value='Add Gift'/>
                    
                 </div >

               
                 <form onSubmit={this.handleClickFind}>
                    <input class="form-control form-control-lg" type="text" placeholder="Example Mersedes AMG or only Mers"
                        value={this.state.findFieldValue} onChange={this.handleChange}/>
                    <input type='submit' class="btn btn-primary mb-2"  value='found'/>


                 </form>
                    
                 



        
                 
                
                 <div className="row">
                
                 <select value={this.state.countOfGift} class="form-select" aria-label="Default select example" onChange={this.countOfGidtOnPage}>
                    <option selected value="5">5</option>
                    <option value='10'>10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                 </select>
                 

                 </div>
                 
                

                <div className="row">
                    <table className="table table-striped table-bordered" >
                        



                        <thead>
                            <tr>
                                <th onClick={this.sorting}>Gift name <strong className='hide-strela'>&#8593;</strong> <strong className='hide-strela'>&#8595;</strong> </th>
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
                                            <input type='button' className="btn btn-danger" onClick={this.deleteGift.bind(this,gift.id)} value='Delete'/>
                                            <input type='button' className="btn btn-info" onClick={this.addTocart.bind(this,gift.id,gift.name,gift.price)} value='In cart'/>
                                            {/* <Link className="btn btn-info" to={`/cart?id=${gift.id}`}>In cart</Link> */}
                                        </td>
                                
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>

                    <input type='button' className="btn btn-info" onClick={this.state.findFieldValue==''?this.loadPrevGift:this.loadPrevGiftWithName} value='Load prev'/>
                    <input type='button' className="btn btn-info" onClick={this.state.findFieldValue==""?this.loadNextGift:this.loadNextGiftWithName} value='Load next'/>
                    
                </div>
                

                


            </div>

        )
    }
}

export default ListGift