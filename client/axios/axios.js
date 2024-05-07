import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json', 
      },
  });



  export const get=(url,params)=>{
    return instance.get(url,{params})
  }
  export const post=(url,data)=>{
    return instance.post(url,data)
  }
  export const deletReq =(url,params)=>{
    return instance.delete(url,params)
  }