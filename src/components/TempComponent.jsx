import { createElement, useState } from "react"
import { useParams } from "react-router-dom"
import GiftServices from "../services/GiftServices";
import TagComponent from "./TagComponent";
import { createBrowserHistory } from "history";
import Loader from "./Loader";



const Tempcomponent=()=>{
    const {id}=useParams();
    const [name, setName] = useState(getGift);
    const [discription, setDiscription] = useState();
    const [price, setPrice] = useState();
    const [duration, setDuration] = useState();
    const [createDate, setCreateDate] = useState();
    const [lastUpdateDate, setLastUpdateDate] = useState();
    const [currentTag, setCurrentTag] = useState('');
    const [tags, setTags] = useState(['nikita','masha']);
    const [loader,setLoader]=useState(false);



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
    
    function updateGift (e){
        const history = createBrowserHistory();
        e.preventDefault();
        let gift = {name: name, discription: discription, price: price, duration: duration,
            createDate: createDate, lastUpdateDate: lastUpdateDate};
        console.log('gift => ' + JSON.stringify(gift));
        console.log('id => ' + JSON.stringify(id));
       
        GiftServices.updateGift(gift.price, id).then( res => {
            setTimeout(() => {
                setTimeout(() => {
                    setLoader(false);
                    history.push(`/gifts/${id}`);
                }, 5000);
                setLoader(true);
                
            }, 1000);
            
            
            
            
        });
        
    }
 
   
    
    function changeNameHandler(event) {
        setCreateDate(new Date());
        setLastUpdateDate(new Date());
        
        setName(event.target.value);
    }

    function changeDiscriptionHandler(event) {
        setDiscription(event.target.value);
    }

    function changePriceHandler(event)  {
        setPrice(event.target.value);
    }


    function changeDurationHandler(event)  {
        setDuration(event.target.value);
    }


    function changeTagHandler (event)  {
       setCurrentTag(event.target.value);

    }

    function addTag(){
        let curtag=currentTag;
        console.log(curtag);

        let masTag=tags;
        masTag.push(curtag);
         console.log(masTag);
        setTags(masTag)
    
        console.log(tags);


    }

    function cancel(){
        const history = createBrowserHistory();
        history.push('/gifts')
      
    }


    function deleteTag(){

        console.log(this);
  

    }

 
  
           


    return (
        <div>
            <br></br>
               <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Add gift</h3>
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label> Name: </label>
                                        <input placeholder="Name" name="name" className="form-control" 
                                            value={name} onChange={changeNameHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Discription: </label>
                                        <input placeholder="discription" name="discription" className="form-control" 
                                            value={discription} onChange={changeDiscriptionHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Price: </label>
                                        <input placeholder="Price" name="price" className="form-control" 
                                            value={price} onChange={changePriceHandler}  />
                                    </div>
                                    <div className = "form-group">
                                        <label> Duration: </label>
                                        <input placeholder="Duration:exp 5" name="duration" className="form-control" 
                                            value={duration} onChange={changeDurationHandler}/>
                                    </div>

                                   


                                    <div className = "form-group">
                                        <label> Tag name: </label>
                                        <input placeholder="tag name" name="tag" className="form-control" 
                                            value={currentTag} onChange={changeTagHandler}/> 

                                        <input type="button" onClick={addTag} value="Отправить" />
                                           
                                
                                    </div>
                                    <div>
                                
                                         {tags.map(tag=>{
                                            
                                            return <TagComponent  tag={tag}/>
                                            
                                        })} 
                                        
                                    </div>
                                  

                                   

                                    <button className="btn btn-success" onClick={updateGift}>Save</button>
                                    <button className="btn btn-danger" onClick={cancel} style={{marginLeft: "10px"}}>Cancel</button> 
                                    <div className="loader-on-update">
                                       {loader && <Loader/>}
                                    </div>
                                    
                                </form>
                            </div>
                        </div>
                    </div>

               </div>
        </div>
    )
}

export default Tempcomponent