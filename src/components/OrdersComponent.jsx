import React, { Component } from "react";
import { Link, useParams,useSearchParams } from "react-router-dom";
import GiftServices from "../services/GiftServices";
import {  } from "history";
import authToken from "../auth/authToken";
import { useHistory } from "react-router-dom";
import { createBrowserHistory } from "history";
import UserService from "../services/UserService";






class OrdersComponent extends Component {
    constructor(props){
        super(props)
        
        this.state={
            users:[],
            countOfGift:5,
            numberPage:1,
            orders:[],

        }

        if(localStorage.getItem('jwtToken')==null){
            const history=createBrowserHistory();
            history.push('/login');
            history.go('/login');

            

        }
       
    
    }
    

    componentDidMount(){
        const id=localStorage.getItem("UserIDinOrder");

        let token=localStorage.getItem("jwtToken");
        console.log(token);
        UserService.showUserOrders(id).then(res=>{
            let info=res.data;
            let orders=info._embedded.orderList;
            console.log(orders);
            this.setState({orders:orders})

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



    showCertificateInOrder(orderid){
        alert(`orders ${orderid}`);
        localStorage.setItem('orderId',orderid);
        const userid=localStorage.getItem('UserIDinOrder');
        
        const history=createBrowserHistory();
        history.push('/users/'+userid+'/orders/'+orderid);
        history.go('/users/'+userid+'/orders/'+orderid);
    }





    

    render(){
        return(
            <div>

                <h2 className="name-of-table">Orders</h2>

                <div className="row">
                    <table className="table table-striped table-bordered">

                        <thead>
                            <tr>
                                <th>OrderID</th>
                                <th>Date of order</th>
                                <th>Tatal amount</th>
         
                            </tr>
                        </thead>
                        <tbody>
                            
                            {
                                this.state.orders.map(
                                    order=>
                                    <tr key={order.orderId}>
                                        <td>{order.orderId}</td>
                                        <td>{order.dataOfOrder}</td>
                                        <td>{order.amount}</td>

                                        <td>
                                            <input type='button' className="btn btn-info" onClick={this.showCertificateInOrder.bind(this,order.orderId)} value='Certificates in order'/>                                       
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

export default OrdersComponent