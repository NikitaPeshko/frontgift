import { createElement, useState } from "react"
import { useParams } from "react-router-dom"
import GiftServices from "../services/GiftServices";
import TagComponent from "./TagComponent";
import { createBrowserHistory } from "history";
import Loader from "./Loader";



const CartComponent=()=>{
    const {id}=useParams();

    const [gifts,setGifts]=useState([{name:"mikitya"}]);

    const [loader,setLoader]=useState(false);
    const [totalAmount,setTotalAmount]=useState(countTotalAmount());
    const [isEmptyCart,setIsEmptyCart]=useState(checkIfCartIsEmpty());

    function checkIfCartIsEmpty(){
        
        if(gifts.length!==0){
            return false;
        }else{
            return true
        }
    }




    



    // function getGift(){
    //     GiftServices.getGiftById(id).then(res=>{
    //         let gift=res.data;
    //         setName(gift.name);
    //         setCreateDate(gift.createDate);
    //         setPrice(gift.price);
    //         setDuration(gift.duration);
    //         setDiscription(gift.discription);
    //         setLastUpdateDate(gift.lastUpdateDate);
    //      //   setTags(gift.listOfTag);
    //     })
        
        
    // }
    
    // function updateGift (e){
    //     const history = createBrowserHistory();
    //     e.preventDefault();
    //     let gift = {name: name, discription: discription, price: price, duration: duration,
    //         createDate: createDate, lastUpdateDate: lastUpdateDate};
    //     console.log('gift => ' + JSON.stringify(gift));
    //     console.log('id => ' + JSON.stringify(id));
       
    //     GiftServices.updateGift(gift.price, id).then( res => {
    //         setTimeout(() => {
    //             setTimeout(() => {
    //                 setLoader(false);
    //                 history.push(`/gifts/${id}`);
    //             }, 5000);
    //             setLoader(true);
                
    //         }, 1000);
            
            
            
            
    //     });
        
    // }
 
   
    
    // function changeNameHandler(event) {
    //     setCreateDate(new Date());
    //     setLastUpdateDate(new Date());
        
    //     setName(event.target.value);
    // }

    // function changeDiscriptionHandler(event) {
    //     setDiscription(event.target.value);
    // }

    // function changePriceHandler(event)  {
    //     setPrice(event.target.value);
    // }


    // function changeDurationHandler(event)  {
    //     setDuration(event.target.value);
    // }


    // function changeTagHandler (event)  {
    //    setCurrentTag(event.target.value);

    // }

    // function addTag(){
    //     let curtag=currentTag;
    //     console.log(curtag);

    //     let masTag=tags;
    //     masTag.push(curtag);
    //      console.log(masTag);
    //     setTags(masTag)
    
    //     console.log(tags);


    // }

    // function cancel(){
    //     const history = createBrowserHistory();
    //     history.push('/gifts')
      
    // }


    // function deleteTag(){

    //     console.log(this);
  

    // }


    function countTotalAmount(){  
            let amount =0;     

            gifts.map(priceOfAllGiftInCart=>{
                amount=amount+priceOfAllGiftInCart.price;
            })

            return amount;
            
    }

 
  
           


    return (
        <div>
            <br></br>
               <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-7 offset-md-3 offset-md-3">
                            <h3 className="text-center">Your gifts</h3>
                            <div className = "card-body">
                                
                                {isEmptyCart && <h1>В корзине еще нет товаров</h1>}


                                <form>
                                    {gifts.map(giftInCart=>{
                                        return(
                                            <div className = "form-group" style={{border:"1px solid black"}}>
                                                <p>Name:{giftInCart.name}</p>
                                                <p>Price:{giftInCart.price}</p>
                                                <input type='button'  className="btn btn-danger" value="Delete"/>
                                            </div>

                                        )
                                    })}

                                    {!isEmptyCart && <h2>Total amount:{totalAmount}</h2>}
                                    
                                    

                                    {!isEmptyCart && <input type='button'  className="btn btn-success" value="Bye all this gifts"/>}
                                </form>
                                
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