import React ,{useState} from "react";
import {useParams} from 'react-router-dom'
import GiftServices from "../services/GiftServices";



function ShowGift(props){

    const {id}=useParams();
    const [name, setName] = useState(getGift);
    const [discription, setDiscription] = useState();
    const [price, setPrice] = useState();
    const [duration, setDuration] = useState();
    const [createDate, setCreateDate] = useState();
    const [lastUpdateDate, setLastUpdateDate] = useState();
    const [currentTag, setCurrentTag] = useState('');
    const [tags, setTags] = useState(['nikita','masha']);



    function getGift(){
        GiftServices.getGiftById(id).then(res=>{
            let gift=res.data;
            setName(gift.name);
            setCreateDate(gift.createDate);
            setPrice(gift.price);
            setDuration(gift.duration);
            setDiscription(gift.discription);
            setLastUpdateDate(gift.lastUpdateDate);
         //   setTags(gift.listOfTag);
        })
        
        
    }
    return(
        <div className="container">
            <div class="card mb-3">
            <div>
                <img class="image-card" src="..." alt="Anytime you can see image this"/>
                <h2 class="name-of-gift-on-card">{name}</h2>
            </div>
            
            <div class="card-body">
            
                <p class="card-text">Discription:{discription}</p>
                <p class="card-text">Duration:{duration}</p>
                <h2>Costs:{price}</h2>

                <input className="btn btn-info btn-lg" type='button' value={`Bye ${name}`}></input>
                <p class="card-text"><small class="text-muted">Last updated {lastUpdateDate}</small></p>
            </div>
            </div>
            

        </div>
    )
}


export default ShowGift