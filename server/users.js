const users = []

const addUsers = ({id,name,chatid}) =>{
    //Cleaning of Data

    name = name.trim().toLowerCase()
    chatid = chatid.trim().toLowerCase()

    const existingUser = users.find((user) => user.chatid == chatid && user.name == name)

    if(existingUser){
        return({error:"User Name is already taken"})
    }
    const user = {id, name, chatid}

    users.push(user)

    return { user }
}
const removeUsers = (id) =>{

    const index = users.find((user) => user.id == id)
    
    if(index){
        return users.splice(index,1)[0]
    }
}
const getUsers = (id) => users.find((user) => user.id == id )

const getUsersInRoom = (chatid) => users.filter((user) => user.chatid == chatid)


module.exports = { addUsers,getUsers,removeUsers,getUsersInRoom,users}