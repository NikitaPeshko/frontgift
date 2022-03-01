import axios from "axios";



const URL_FOR_POSTS='http://localhost:8080/gifts';

const URL_FOR_UPDATE_PRICE='http://localhost:8080/gifts/changeprice'
const URL_AUTH='http://localhost:8080/auth'
const URL_FOR_GET_USER_ONLY_ADMIN='http://localhost:8080/users'

const URL_FOR_GET_FIND_USERID_BY_LOGIN='http://localhost:8080/users/finduseridbylogin';
const URL_FOR_FIND_GIFT_BY_NAME='http://localhost:8080/gifts/findbyname?name=';

class GiftService{

    getUsers(token){
        return axios.get(URL_FOR_GET_USER_ONLY_ADMIN,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        });
    }

    findGiftByName(name,content,page){
        let url=URL_FOR_FIND_GIFT_BY_NAME+name+'&page='+page+'&content='+content;

        return axios.get(url);
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

    getGiftsWithParam(content,page,sortBy,sortingMethod){
       // alert(URL_FOR_POSTS+'?content='+content+'&page='+page+'&sortby='+sortBy+'&sort='+sortingMethod)
        return axios.get(URL_FOR_POSTS+'?content='+content+'&page='+page+'&sortby='+sortBy+'&sort='+sortingMethod);
    }

    addGift(gift,token){
        return axios.post(URL_FOR_POSTS,gift,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        });
    }

    getGiftById(giftId){
        return axios.get(URL_FOR_POSTS+'/'+giftId);
    }

    updateGift(newprice, giftId){
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwtToken')}`;
        
        return axios.put(URL_FOR_UPDATE_PRICE + '/' + giftId+'?price='+newprice);
    }

    

    deleteGift(giftId){
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwtToken')}`;
        return axios.delete(URL_FOR_POSTS + '/' + giftId);
    }

}


export default new GiftService()