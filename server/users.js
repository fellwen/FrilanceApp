const { trimStr } = require('./utils');

let users = [];

const findUser = (user) => {  
    const userName = trimStr(user.name);
    const userRoom = trimStr(user.room);
    
    const isExist = users.find(
        (u) => trimStr(u.name) === userName && trimStr(u.room) === userRoom
    );
    
    return isExist;
};

const removeUsers = (user) => {
    const found = findUser(user);

    if (found) {
        users = users.filter(({ room, name }) => room !== found.room || name !== found.name);
        return found;
    }
};
const getRoomUsers = (room) => {
    return users.filter((u) => u.room === room);
};

const addUser = (user) => {
    const isExist = findUser(user); 
    if (!isExist) {
        users.push(user);
    }

    const currentUser = isExist || user;

    return { isExist: !!isExist, user: currentUser };
};

module.exports = { addUser, findUser, getRoomUsers, removeUsers };
