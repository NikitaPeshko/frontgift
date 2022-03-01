import { createElement, useState } from "react"
import { Link, useParams ,useSearchParams} from "react-router-dom"
import GiftServices from "../services/GiftServices";
import TagComponent from "./TagComponent";
import { createBrowserHistory } from "history";
import Loader from "./Loader";
import UserService from "../services/UserService";



const CartComponent=()=>{
    
    

    const [param,setParam]=useSearchParams();
  
    
    const [gifts,setGifts]=useState([]);
    const [gift,setGift]=useState({});
  

    

    const [loader,setLoader]=useState(false);
    const [totalAmount,setTotalAmount]=useState(countTotalAmount());
    const [isEmptyCart,setIsEmptyCart]=useState(true);
    const [userID,setUserID]=useState(getIdByLogin());

    

    function checkIfCartIsEmpty(){
        
        if(gifts.length!==0){
            setIsEmptyCart(false);
        }else{
            setIsEmptyCart(true)
        }
    }

    
    function getFromLocalStorage(){
        let giftsString=localStorage.getItem("giftInCart");
        let arrayGifts=giftsString.split('|||');
        console.log(arrayGifts);
        
        return arrayGifts;
       // return arrayGifts;

       
    }

    function initGiftsInCart(){
        let arrayGifts=getFromLocalStorage();
        console.log(arrayGifts);
        let str='';
        let newArr=[];
        for(let i=0;i<arrayGifts.length-1;i++){
            str=arrayGifts[i];
            console.log(`str=${str}`)
            newArr.push(JSON.parse(str));
        }
        console.log(newArr);

        setGifts(newArr);
        checkIfCartIsEmpty();
        let amount=countTotalAmount();
        setTotalAmount(amount);
        

    }


    function countTotalAmount(){  
            let amount =0; 
                
          
            gifts.map(priceOfAllGiftInCart=>{
                
                amount=amount+priceOfAllGiftInCart.price;
                console.log(amount);
            })

            return amount;
            
    }


    function byeAllGift(){
       
        if(typeof(userID)!=='number'){
            alert('You not log in. Log in to buy this gifts');
            const history=createBrowserHistory();
            history.push('/login');
            history.go('/login');
            return false;
        }
        let giftsToBye=gifts.concat();
        let giftsIDs=[];
        giftsToBye.map(gift=>{
            giftsIDs.push(gift.id);


        });
        alert(giftsIDs);  
   
        UserService.byeGifts(giftsIDs, userID);
        alert("Succsess");
        localStorage.removeItem('giftInCart');
     
        
       

    }
    function getIdByLogin(){
        const login=localStorage.getItem('userLogin');
       UserService.getUserIDByLogin(login).then(res=>
        {
            const userID=res.data;
            localStorage.setItem('UserAuthId',userID);
            setUserID(userID);
            
        });

    }



 
  
           


    return (
        <div>
            <br></br>
               <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-7 offset-md-3 offset-md-3">
                        <input type='button'  className="btn btn-success" onClick={initGiftsInCart} value="Update cart"/>
                            <h3 className="text-center">Your gifts</h3>
                            <div className = "card-body">
                                
                                {isEmptyCart && <h1>В корзине еще нет товаров</h1>}


                                <form>
                                    {
                                        gifts.map(giftInCart=>{
                                            
                                            
                                            return(
                                                <div className = "form-group" style={{border:"1px solid black"}}>
                                                    <p>Name:{giftInCart.name}</p>
                                                    <p>Price:{giftInCart.price}</p>
                                                    <input type='button'  className="btn btn-danger" value="Delete"/>
                                                </div>
                            
                                            )
                                        })
                                    }
                                    
                                   
                                  

                                    {!isEmptyCart && <h2>Total amount:{totalAmount}</h2>}
                                    
                                    

                                    {!isEmptyCart && <input type='button'  className="btn btn-success" onClick={byeAllGift} value="Bye all this gifts"/>}
                                </form>


                                <Link to={"/gifts"}>Go to bye next gift</Link>
                                
                                {/* <form>
                                    <div className = "form-group">
                                        <label> Name: </label>
                                        <input placeholder="Name" name="name" className="form-control" 
                                            value={name} onChange={changeNameHandler}/>
                                    </div>
             

                                    <button className="btn btn-success" onClick={updateGift}>Save</button>
                                   
                                    <div className="loader-on-update">
                                       {loader && <Loader/>}
                                    </div>
                                    
                                </form> */}
                            </div>
                        </div>
                    </div>

               </div>
        </div>
    )
}

export default CartComponent