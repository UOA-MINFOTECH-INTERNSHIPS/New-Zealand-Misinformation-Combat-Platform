import { Article } from './articleschema';

async function createArticle(article) {

    const dbArticle = new Article(article);
    await dbArticle.save();
    return dbArticle;
}

async function retrieveArticle20() {
    return await Article.find().limit(20);
}

async function retrieveArticle(id) {
    return await Article.findById(id);
}

async function updateArticle(article,user) {

    const dbArticle = await Article.findById(article._id);
    if (dbArticle.author=user.username) {

        dbArticle.author = article.author;
        dbArticle.title = article.title;
        dbArticle.url = article.url;
        dbArticle.urlToImage = article.urlToImage;
        dbArticle.publishAt = Date.now;
        dbArticle.content = article.content;

        await dbArticle.save();
        return true;
    }

    return false;
}

async function deleteArticle(id) {
    await Article.deleteOne({ _id: id });
}

async function deleteAllArticle() {
    await Article.deleteMany({});
}

export {
    createArticle,
    retrieveArticle20,
    retrieveArticle,
    updateArticle,
    deleteArticle,
    deleteAllArticle
}