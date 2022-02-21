import axios from "axios";



const URL_FOR_POSTS='http://localhost:8080/gifts'
class GiftService{


    getGifts(){
        return axios.get(URL_FOR_POSTS);
    }

    addGift(gift){
        return axios.post(URL_FOR_POSTS,gift);
    }

}


export default new GiftService()