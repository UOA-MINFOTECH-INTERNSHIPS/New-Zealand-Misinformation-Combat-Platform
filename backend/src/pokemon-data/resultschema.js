import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const resultSchema = new Schema({
    missionID: {type:String,required:true},
    url: {type:String,required:true},
    title: {type:String,required:true},
    author: {type:String,required:true},
    image: {type:String,required:true},
    backgroundInfo: {type:String,required:true},
    question: {type:String,required:true},
    analysis: {type:String,required:true},
    conclusion : {type:String,required:true},
    verdict: {type:String,required:true},
    reference: {type:String,required:false},
    keywords: {type: Array,required:true}
}, {
    timestamps: {}
});

const Result = mongoose.model('Result', resultSchema);

export { Result };