import {deletReq,get,post} from '../../../axios/axios'

export const signupUser=async(data)=>{
    console.log('data reached',data)
    try{
    
    let res=await post('/signup',data)
    if(res.status==200){
        console.log('user created successfully')
        return {
            user:res.data.data,
            status:true
        }
    }
    }catch(err){
        console.log(err)
        return {
            status:false,
            error:err.response.data.error
        }
    }
        

}
export const LoginUser=async(data)=>{
    console.log('data reached',data)
    try{
    
    let res=await post('/Login',data)
    if(res.status==200){
        console.log('user Logined Success')
        return {
            user:res.data.data,
            status:true
        }
    }
    }catch(err){
        console.log(err)
        return {
            status:false,
            error:err.response.data.error
        }
    }
        

}