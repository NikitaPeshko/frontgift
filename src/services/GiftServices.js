import axios from "axios";



const URL_FOR_POSTS='http://localhost:8080/gifts';
const URL_FOR_UPDATE_PRICE='http://localhost:8080/gifts/changeprice'
class GiftService{


    getGifts(){
        return axios.get(URL_FOR_POSTS);
    }

    addGift(gift){
        return axios.post(URL_FOR_POSTS,gift);
    }

    getGiftById(giftId){
        return axios.get(URL_FOR_POSTS+'/'+giftId);
    }
    updateGift(newprice, giftId){
        return axios.put(URL_FOR_UPDATE_PRICE + '/' + giftId+'?price='+newprice);
    }

    deleteEmployee(employeeId){
        return axios.delete(URL_FOR_POSTS + '/' + employeeId);
    }

}


export default new GiftService()