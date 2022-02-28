import axios from "axios";



const URL_FOR_POSTS='http://localhost:8080/gifts';
const URL_FOR_UPDATE_PRICE='http://localhost:8080/gifts/changeprice'
const URL_AUTH='http://localhost:8080/auth'
const URL_FOR_GET_USER_ONLY_ADMIN='http://localhost:8080/users'

const URL_FOR_GET_FIND_USERID_BY_LOGIN='http://localhost:8080/users/finduseridbylogin';

class GiftService{

    getUsers(token){
        return axios.get(URL_FOR_GET_USER_ONLY_ADMIN,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        });
    }

    // getUserIDByLogin(login){
    //     return axios.get(URL_FOR_GET_FIND_USERID_BY_LOGIN+'?login='+login);
    // }

    getGifts(){
        return axios.get(URL_FOR_POSTS);
    }

    authantification(credentials){
        return axios.post(URL_AUTH,credentials);
    }

    getGiftsWithParam(content,page){
        return axios.get(URL_FOR_POSTS+'?content='+content+'&page='+page);
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