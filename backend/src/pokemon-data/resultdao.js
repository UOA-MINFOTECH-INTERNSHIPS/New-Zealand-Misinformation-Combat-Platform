import { Result } from './resultschema';
import { User } from './userschema';

async function createResult(result) {
    const dbResult = new Result(result);
    await dbResult.save();
    return dbResult;
}

async function retrieveAllResult() {
    return await Result.find();
}

async function retrieveResult(id) {
    return await Result.findById(id);
}

async function updateResult(id,newResult) {

    const dbResult = await Result.findById({_id:id});

    dbResult.analysis = newResult.analysis;
    dbResult.conclusion = newResult.conclusion;
    dbResult.verdict = newResult.verdict;
    dbResult.reference = newResult.reference;
    // dbResult.imagesArray = newResult.imagesArray;

    await dbResult.save();
    return dbResult;

}

async function deleteResult(id) {
    await Result.findByIdAndDelete({_id:id});
}

async function likeResult(username,id) {
    const dbResult = await Result.findById(id);
    const existingUser = await User.findOne({ username });
    if(!dbResult)
        return 'result does not exsit'
    if(!existingUser)
        return 'user does not exsit'
    if(existingUser.arrayOfLiked.includes(id))
        return 'you already like this result'
    if (dbResult && existingUser){
        await existingUser.arrayOfLiked.push(id);
    }
    await existingUser.save();
    return existingUser;
}

async function unlikeResult(username,id) {
    const dbResult = await Result.findById(id);
    const existingUser = await User.findOne({ username });
    if(!dbResult)
        return 'result does not exsit'
    if(!existingUser)
        return 'user does not exsit'
    if(!existingUser.arrayOfLiked.includes(id))
        return "you didn't like this result before"
    if (dbResult && existingUser){
        await existingUser.arrayOfLiked.pull(id);
    }
    await existingUser.save();
    return existingUser;
}

async function deleteAllResult() {
    await Result.deleteMany({});
}

export {
    createResult,
    retrieveAllResult,
    retrieveResult,
    updateResult,
    deleteResult,
    likeResult,
    unlikeResult,
    deleteAllResult
}