import React, { Component } from "react";
import { Link, useParams,useSearchParams } from "react-router-dom";
import GiftServices from "../services/GiftServices";
import {  } from "history";
import authToken from "../auth/authToken";
import { useHistory } from "react-router-dom";
import { createBrowserHistory } from "history";
import UserService from "../services/UserService";






class ListUsers extends Component {
    constructor(props){
        super(props)
        
        this.state={
            users:[],
            countOfGift:5,
            numberPage:1,

        }

        if(localStorage.getItem('jwtToken')==null){
            const history=createBrowserHistory();
            history.push('/login');
            history.go('/login');

            

        }
       
    
    }

    componentDidMount(){
        localStorage.setItem('numberOfPageUsers',1);
        const page=localStorage.getItem('numberOfPageUsers');
        let token=localStorage.getItem("jwtToken");
        console.log(token);
        GiftServices.getUsers(token,page,5).then((res)=>{
            let info=res.data;
           
            let users=info._embedded.userDTOList;
            
            this.setState({users:users})

        });
        
        
    }

    addUser=()=>{
        const history = createBrowserHistory();
        history.push('/add-user');
        history.go('/add-user');

    }

    

    loadUsersFromDb=(numberPage)=>{
        
        let token=localStorage.getItem("jwtToken");
        GiftServices.getUsers(token,numberPage,5).then(res=>{
            
            let info=res.data;
            console.log(info)


            let temp =info;
            console.log(temp.hasOwnProperty('_embedded'))
            
            
            if(temp.hasOwnProperty('_embedded')){
                let users=info._embedded.userDTOList;
                console.log(users)
                
                if(users!==undefined){
                    this.setState({users:users})
                }

            }else{
                localStorage.setItem("numberOfPageUsers",localStorage.getItem("numberOfPageUsers")-1)
            }

            
            
            
        });

    }

    loadNextGift=()=>{
        localStorage.setItem('numberOfPageUsers',Number(localStorage.getItem("numberOfPageUsers"))+1);
        let page=localStorage.getItem('numberOfPageUsers')
        
        
        this.loadUsersFromDb(page);
    }

    loadPrevGift=()=>{
        localStorage.setItem('numberOfPageUsers',localStorage.getItem("numberOfPageUsers")-1);
        let page=localStorage.getItem('numberOfPageUsers');
        if(page<1){
            
            page=1;
            localStorage.setItem('numberOfPageUsers',1);
        };
        this.loadUsersFromDb(page);
    }

    blockUserAccaount(id){
        const token=localStorage.getItem('jwtToken')
        UserService.blockUser(id,token);
        alert('succdesfully block user')
    }

    showOrders(id){
        
        localStorage.setItem('UserIDinOrder',id);
        
        const history=createBrowserHistory();
        history.push('/users/'+id+'/orders');
        history.go('/users/'+id+'/orders');
    }





    

    render(){
        return(
            <div>

                <h2 className="name-of-table">List of Users</h2>
                <div className = "row">
                     <input type="button" className="btn btn-primary" onClick={this.addUser} value='Add User'/>
                
                 </div>
                
                 <div className="row">
              
                 

                 </div>
                 
                

                <div className="row">
                    <table className="table table-striped table-bordered">
                        



                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Login</th>
                                <th>Role</th>
                                <th>Actions</th>
                             
                            </tr>
                        </thead>
                        <tbody>
                            
                            {
                                this.state.users.map(
                                    user=>
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.login}</td>
                                        <td>{user.roleName}</td>
                                        
                                
                                        <td>
                                            <Link className="btn btn-info" to={`/update-user/${user.id}`}>Edit</Link>
                                            <input type='button' className="btn btn-danger" onClick={this.blockUserAccaount.bind(this,user.id)} value='Block user'/>
                                            <input type='button' className="btn btn-info" onClick={this.showOrders.bind(this,user.id)} value='Orders'/>                                       
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

export default ListUsers