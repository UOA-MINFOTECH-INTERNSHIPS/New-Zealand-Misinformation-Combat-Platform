import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    name: String,
    email:String,
    password:String
}, {
    timestamps: {}
});

const User = mongoose.model('User', userSchema);

export { User };