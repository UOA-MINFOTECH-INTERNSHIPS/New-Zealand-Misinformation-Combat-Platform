import { Mission } from './missionschema';
import { User } from './userschema';

async function createMission(mission) {
    const dbMission = new Mission(mission);
    await dbMission.save();
    return dbMission;
}

async function retrieveAllMission() {
    return await Mission.find({status: false});
}

async function sortAllMission() {
    return await Mission.find({status: false}).sort({support: -1});
}

async function retrieveMission20() {
    return await Mission.find().limit(20);
}

async function retrieveMission(id) {
    return await Mission.findById(id);
}

async function updateMission(id,newMission) {

    const dbMission = await Mission.findById({_id:id});

    dbMission.url = newMission.url;
    dbMission.title=newMission.title;
    dbMission.image = newMission.image;
    dbMission.backgroundInfo = newMission.backgroundInfo;
    dbMission.question = newMission.question;
    dbMission.status = newMission.status;
    dbMission.keywords = newMission.keywords;

    await dbMission.save();
    return dbMission;

}

async function deleteMission(id) {
    await Mission.findByIdAndDelete({_id:id});
}

async function voteMission(username,id) {
    const dbMission = await Mission.findById(id);
    const existingUser = await User.findOne({ username });
    if(!dbMission)
        return 'mission does not exsit'
    if(!existingUser)
        return 'user does not exsit'
    if(existingUser.arrayOfVoted.includes(id))
        return 'you already voted this mission'
    if (dbMission){
        
        await existingUser.arrayOfVoted.push(id);
        const users = await User.find({arrayOfVoted : id});
        dbMission.support = users.length;
    }
    await dbMission.save();
    await existingUser.save();
    return [dbMission,existingUser];
}

async function unvoteMission(username,id) {
    const dbMission = await Mission.findById(id);
    const existingUser = await User.findOne({ username });
    if(!dbMission)
        return 'mission does not exsit'
    if(!existingUser)
        return 'user does not exsit'
    if(!existingUser.arrayOfVoted.includes(id))
        return "you didn't vote this mission before"
    if (dbMission){
        await existingUser.arrayOfVoted.pull(id);
        const users = await User.find({arrayOfVoted : id});
        dbMission.support = users.length;
    }
    await dbMission.save();
    await existingUser.save();
    return [dbMission,existingUser];
}

async function deleteAllMission() {
    await Mission.deleteMany({});
}

export {
    createMission,
    retrieveAllMission,
    retrieveMission20,
    retrieveMission,
    updateMission,
    deleteMission,
    voteMission,
    unvoteMission,
    deleteAllMission,
    sortAllMission
}