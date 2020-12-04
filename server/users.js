const users = []

const addUser = ({id,name,room})=>{
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.findIndex((user)=>{
        if(user.name === name && user.room === room){
            return user
        }
    })
    if(existingUser !== -1){
        return {error:'user with same name already exits!!!! try another username'}
        
    }
    const user = {id,name,room}
    users.push(user)
    return {user}
}

const removeUser = (id)=>{
    const index = users.findIndex((user)=>{
        if(user.id === id){
            return user;
        }
    })
    if(index !== -1){
        const user = users.splice(index,1)[0]
        console.log(user)
        return user;
    }
}

const getUser = (id)=>{
    const userindex = users.findIndex((user)=>{
        if (user.id === id){
            return user
        }
    })
    return users[userindex];
}

const getUsersInRoom = (room)=>{
    return users.filter((user)=>{
        if(user.room === room){
            return user
        }
    })
}


module.exports = {addUser,removeUser,getUser,getUsersInRoom}