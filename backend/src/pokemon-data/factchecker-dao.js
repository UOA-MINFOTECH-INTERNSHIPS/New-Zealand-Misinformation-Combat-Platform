import { FactChecker } from './factcheckerschema';

async function createFactChecker(factchecker) {

    const dbChecker = new FactChecker(factchecker);
    await dbChecker.save();
    return dbChecker;
}

async function retrieveCheckerList() {
    return await FactChecker.find();
}

async function retrieveChecker(id) {
    return await FactChecker.findById(id);
}

async function updateChecker(factchecker) {

    const dbChecker = await FactChecker.findById(factchecker._id);
    if (dbChecker) {

        dbChecker.username = factchecker.username;
        dbChecker.name = factchecker.name;
        dbChecker.email=factchecker.email;
        dbChecker.password=factchecker.password;
        dbChecker.category=factchecker.category;

        await dbChecker.save();
        return true;
    }

    return false;
}

async function deleteChecker(id) {
    await FactChecker.deleteOne({ _id: id });
}

async function deleteAllChecker() {
    await FactChecker.deleteMany({});
}

export {
    createFactChecker,
    retrieveCheckerList,
    retrieveChecker,
    updateChecker,
    deleteChecker,
    deleteAllChecker
}