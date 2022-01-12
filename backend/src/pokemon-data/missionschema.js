import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const missionSchema = new Schema({
    url: {type:String,required:true},
    title: {type:String,required:true},
    author: {type:String,required:true},
    image: {type:String,required:true},
    backgroundInfo: {type:String,required:true},
    question: {type:String,required:true},
    status: {type:Boolean,required:true},
    support: {type:Number,required:true},
    keywords: {type:[String],required:true}
}, {
    timestamps: {}
});

const Mission = mongoose.model('Mission', missionSchema);

export { Mission };