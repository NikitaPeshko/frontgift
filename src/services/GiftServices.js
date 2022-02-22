import axios from "axios";



const URL_FOR_POSTS='http://localhost:8080/gifts'
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
    updateEmployee(employee, employeeId){
        return axios.put(URL_FOR_POSTS + '/' + employeeId, employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(URL_FOR_POSTS + '/' + employeeId);
    }

}


export default new GiftService()