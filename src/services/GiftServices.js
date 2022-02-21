import axios from "axios";



const URL_FOR_POSTS='http://localhost:8080/gifts'
class GiftService{


    getGifts(){
        return axios.get(URL_FOR_POSTS);
    }

}


export default new GiftService()