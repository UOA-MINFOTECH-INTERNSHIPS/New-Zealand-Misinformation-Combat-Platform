import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    author: String,
    title: String,
    description:String,
    url:String,
    urlToImage:Image,
    publishAt:Date,
    content:String,
    like: Boolean
}, {
    timestamps: {}
});

const Article = mongoose.model('Article', articleSchema);

export { Article };