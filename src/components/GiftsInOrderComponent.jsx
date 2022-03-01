import React, { Component } from "react";
import { Link } from "react-router-dom";
import GiftServices from "../services/GiftServices";
import {  } from "history";
import authToken from "../auth/authToken";

import { createBrowserHistory } from "history";
import UserService from "../services/UserService";






class GiftsInOrderComponent extends Component {
    constructor(props){
        super(props)
        
        this.state={
            countOfGift:5,
            numberPage:1,
            giftsInOrder:[],
            totalAmount:0,

        }

        if(localStorage.getItem('jwtToken')==null){
            const history=createBrowserHistory();
            history.push('/login');
            history.go('/login');

            

        }
       
    
    }
    

    componentDidMount(){
        const userid=localStorage.getItem("UserIDinOrder");
        const orderId=localStorage.getItem("orderId");

        UserService.showGiftsInOrder(userid,orderId).then(res=>{
            let info=res.data;
            const totalAmount=info.amount;
            let gifts=info.giftsinorder;
            this.setState({totalAmount});
            this.setState({giftsInOrder:gifts})
            console.log(gifts);
            console.log(totalAmount);
           // this.setState({orders:orders})

        });
    }




    countOfGidtOnPage=(event)=>{
        let newCountOfProdcut=event.target.value;
        this.setState({countOfGift:newCountOfProdcut})
        GiftServices.getUsers(newCountOfProdcut,this.state.numberPage).then(res=>{
            this.setState({users:res.data})

        });
    
    }

    loadGiftsFromDb=(numberPage)=>{
        GiftServices.getUsers().then(res=>{
            if(res.data==0){
                
                this.setState({numberPage:numberPage-1})
                return;
            
            }
            console.log(res.data);
            
            this.setState({users:res.data})
            
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



    showGiftsInOrder(id){
        
    }





    

    render(){
        return(
            <div>

                <h2 className="name-of-table">Orders</h2>

                <div className="row">
                    <table className="table table-striped table-bordered">

                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Cost</th>
                                
         
                            </tr>
                        </thead>
                        <tbody>
                            
                            {
                                this.state.giftsInOrder.map(
                                    user=>
                                    <tr key={user.orderId}>
                                        <td>{user.name}</td>
                                        <td>{user.price}</td>
      
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <h2>Tatal amount:{this.state.totalAmount}</h2>
                </div>
                


            </div>

        )
    }
}

export default GiftsInOrderComponent