import axios from "axios";



const URL_FOR_GET_FIND_USERID_BY_LOGIN='http://localhost:8080/users/finduseridbylogin';
const URL_FOR_BYE_GIFTS='http://localhost:8080/users/buygift';
const URL_FOR_BLOCK_USER='http://localhost:8080/users/';


class UserService{



    byeGifts(giftsid,userID){
        let url=URL_FOR_BYE_GIFTS+'/'+userID+'/?';
        for(let i=0;i<giftsid.length;i++){
            url=url+"gift="+giftsid[i]+'&';

        }
        
        alert(url.slice(0,url.length-1));
        
      //  return axios.post(url)

    }

    getUserIDByLogin(login){
        return axios.get(URL_FOR_GET_FIND_USERID_BY_LOGIN+'?login='+login);
    }


    blockUser(id,token){
        
        return axios.delete(URL_FOR_BLOCK_USER+id,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        });

    }




}


export default new UserService()