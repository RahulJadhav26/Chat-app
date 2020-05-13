const express = require("express")
const socketio = require("socket.io")
const http = require("http")
const { addUsers,getUsers,removeUsers,getUsersInRoom,users} = require('./users')
const PORT = process.env.PORT || 8000
const router = require('./router.js')
const app = express()
const server = http.createServer(app)
const io =socketio(server)

app.use(router) 

function logData(message){
    var d = new Date()
    var time = '[' + d.getHours() +  ':' + d.getMinutes() + ':' + d.getSeconds() + ']' 
    console.log(message + time)
}

io.on('connection' , (socket)=> {
    logData("We are connected to server")
    // io.emit('message',{text:"hello"})
     
    socket.on('join' , (joinedUser,callback)=>{
        const {error,user} = addUsers({id:socket.id, name:joinedUser.name,chatid: joinedUser.chatid})
        console.log(user)
        console.log(users)
       
        if(error){
           return callback(error);
        }
       
        socket.emit('message',{user:'admin', text:`Hello ${user.name} , Welcome to Chat Room ${user.chatid} `})
        socket.broadcast.to(user.chatid).emit('message',{user:'admin', text:`${user.name} has joined..!!`})
        socket.join(user.chatid)

    })

    socket.on('sendMessage', (message , callback)=>{
        const user = getUsers(socket.id)
        io.to(user.chatid).emit('userMessage',{user: user.name, text: message})
        // io.emit("message", {user: user.name , text:message} )
        // io.emit('userMessage', {user: user.name , text:message})

        callback();
    })

    socket.on('disconnect', ()=>{
        
        const user = removeUsers(socket.id)
       if(user){
        io.to(user.chatid).emit('message', {user:'admin' , text:`${user.name} has Left..!!`})
       }
         console.log("User Logged Out")
       
    })
})

server.listen(PORT, () => console.log(`Server has started on  port ${PORT}`))