import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type:String,required:true},
    name: {type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    arrayOfUserMission:[Schema.Types.ObjectId],
    arrayOfVoted:[Schema.Types.ObjectId],
    arrayOfLiked:[Schema.Types.ObjectId],
    userType:{type:String},
    category:{type:String},
    arrayOfChecked:[Schema.Types.ObjectId],
    
}, {
    timestamps: {}
});

const User = mongoose.model('User', userSchema);

export { User };