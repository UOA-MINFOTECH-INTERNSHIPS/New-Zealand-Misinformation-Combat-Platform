import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const factCheckerSchema = new Schema({
    username: {type:String,required:true},
    name: {type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    category:{type:String,required:true},
    arrayOfID:[Schema.Types.ObjectId]
}, {
    timestamps: {}
});

const FactChecker = mongoose.model('FactChecker', factCheckerSchema);

export { FactChecker };