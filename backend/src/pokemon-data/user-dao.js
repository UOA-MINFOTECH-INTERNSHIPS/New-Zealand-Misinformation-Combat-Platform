import { User } from './userschema';
import jwt from 'jsonwebtoken';

async function createUser(user) {

    const dbUser = new User(user);
    await dbUser.save();
    return dbUser;
}

async function retrieveUserList() {
    return await User.find();
}

async function retrieveUser(id) {
    return await User.findById(id);
}

async function updateUser(user) {

    const dbUser = await User.findById(user._id);
    if (dbUser) {

        dbUser.username = user.username;
        dbUser.name = user.name;
        dbUser.email=user.email;
        dbUser.password=user.password;

        await dbUser.save();
        return true;
    }

    return false;
}

async function deleteUser(id) {
    await User.deleteOne({ _id: id });
}

async function deleteAllUser() {
    await User.deleteMany({});
}

export {
    createUser,
    retrieveUserList,
    retrieveUser,
    updateUser,
    deleteUser,
    deleteAllUser
}