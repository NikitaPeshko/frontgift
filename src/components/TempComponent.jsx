import { useState } from "react"
import { useParams } from "react-router-dom"
import GiftServices from "../services/GiftServices";



const Tempcomponent=()=>{
    const {id}=useParams();
    const [name, setName] = useState(getGift());


    function getGift(){
        
        GiftServices.getGiftById(id).then(res=>{
            let gift=res.data;
            setName(gift.name);
            console.log(name);
        })
    }


    


    return(
        <div>
           
            {name}
        </div>
    )
}

export default Tempcomponent