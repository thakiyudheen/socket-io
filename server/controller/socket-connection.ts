import { Server, Socket } from 'socket.io'

export const connectSocket=(io:Server)=>{

    const onlineUsers:string[]=[]
    io.on('connection',(socket:Socket)=>{
        console.log('The socket connected successfully'

        )
        
        // to recieve the message 
        socket.on('message',(message)=>{
            console.log("this is the message",message)
            if(onlineUsers.includes(message)){
                socket.to(message).emit("getmsg",message)
            }
        })
        socket.on('getId',(socketid:string)=>{
            console.log('this is id')
            onlineUsers.push(socketid)
        })
        console.log(onlineUsers);
        
    })

   
    // Here disconnect the socket 
    io.on('disconnect',()=>{
        console.log('The socket is disconnected')
    })
}