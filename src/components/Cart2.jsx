import React, { Component } from "react";
import { Link, useParams,useSearchParams } from "react-router-dom";
import GiftServices from "../services/GiftServices";
import { createBrowserHistory } from "history";
import UserService from "../services/UserService";






class Cart2 extends Component {
    constructor(props){
        super(props)
        
        this.state={
            gifts:[],
            totalAmount:0,
            isEmptyCart:false,
            userID:undefined,
            

        }

        
       
    
    }

    componentDidMount(){
        this.getIdByLogin();

        this.initGiftsInCart();
        this.checkIfCartIsEmpty();
        this.countTotalAmount();
        setTimeout(()=>{
         
            this.setState({totalAmount:this.countTotalAmount()})
          
        },0);
        
        

    }

    checkIfCartIsEmpty=()=>{
        const isEmptyCart=localStorage.getItem("giftInCart")==null?true:false;
        
        this.setState({isEmptyCart:isEmptyCart})
        
        
    }

    
    getFromLocalStorage=()=>{
        let giftsString=localStorage.getItem("giftInCart");
        if(giftsString==null){
            return false;
        }
        let arrayGifts=giftsString.split('|||');
        console.log(arrayGifts);
        
        return arrayGifts;
       // return arrayGifts;

       
    }

    initGiftsInCart=()=>{
        let arrayGifts=this.getFromLocalStorage();
        
        console.log(arrayGifts);
        let str='';
        let newArr=[];
        for(let i=0;i<arrayGifts.length-1;i++){
            str=arrayGifts[i];
            console.log(`str=${str}`)
            newArr.push(JSON.parse(str));
        }
        console.log(newArr);

        this.setState({gifts:newArr});
        
        this.checkIfCartIsEmpty();
        // let amount=this.countTotalAmount();
        // this.setState({totalAmount:amount});
        

    }


    countTotalAmount=()=>{  
            let amount =0;
            
                
          
            this.state.gifts.map(priceOfAllGiftInCart=>{
                
                amount=amount+priceOfAllGiftInCart.price;
                console.log(amount);
            });
            

            return amount;
            
    }


    byeAllGift=()=>{
       
        if(typeof(this.state.userID)!=='number'){
            alert('You not log in. Log in to buy this gifts');
            const history=createBrowserHistory();
            history.push('/login');
            history.go('/login');
            return false;
        }
        let giftsToBye=this.state.gifts.concat();
        let giftsIDs=[];
        giftsToBye.map(gift=>{
            giftsIDs.push(gift.id);


        });
          
   
        UserService.byeGifts(giftsIDs, this.state.userID);
        alert("Succsess");
        localStorage.removeItem('giftInCart');
     
        
       

    }
    getIdByLogin=()=>{
        const login=localStorage.getItem('userLogin');
       UserService.getUserIDByLogin(login).then(res=>
        {
            const userID=res.data;
            localStorage.setItem('UserAuthId',userID);
            this.setState({userID:userID});
            
        });

    }


        


    render(){
        return(
            <div>
            <br></br>
               <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-7 offset-md-3 offset-md-3">
                        
                            <h3 className="text-center">Your gifts</h3>
                            <div className = "card-body">
                                
                                {this.state.isEmptyCart && <h1>В корзине еще нет товаров</h1>}


                                <form>
                                    {
                                        this.state.gifts.map(giftInCart=>{
                                            
                                            
                                            return(
                                                <div className = "form-group" style={{border:"1px solid black"}}>
                                                    <p>Name:{giftInCart.name}</p>
                                                    <p>Price:{giftInCart.price}</p>
                                                    <input type='button'  className="btn btn-danger" value="Delete"/>
                                                </div>
                            
                                            )
                                        })
                                    }
                                    
                                   
                                  

                                    {!this.state.isEmptyCart && <h2>Total amount:{this.state.totalAmount}</h2>}
                                    
                                    

                                    {!this.state.isEmptyCart && <input type='button'  className="btn btn-success" onClick={this.byeAllGift} value="Bye all this gifts"/>}
                                </form>


                                <Link to={"/gifts"}>Go to bye next gift</Link>
                                
                                
                            </div>
                        </div>
                    </div>

               </div>
        </div>

        )
    }
}

export default Cart2