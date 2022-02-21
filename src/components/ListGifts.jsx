import React, { Component } from "react";
import GiftServices from "../services/GiftServices";


class ListGift extends Component {
    constructor(props){
        super(props)
        
        this.state={
            gifts:[],

        }
    }

    componentDidMount(){
        GiftServices.getGifts().then((res)=>{
            this.setState({gifts:res.data})

        });
        
    }

    render(){
        return(
            <div>
                <h2 className="name-of-table">List of Gifts</h2>
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
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>


            </div>

        )
    }
}

export default ListGift