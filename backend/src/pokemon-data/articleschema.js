import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    author: String,
    title: String,
    description:String,
    url:String,
    urlToImage:String,
    publishAt:Date,
    content:Array,
    score: String
}, {
    timestamps: {}
});

const Article = mongoose.model('Article', articleSchema);

export { Article };