import { Mission } from './missionschema';

async function createMission(mission) {
    const dbMission = new Mission(mission);
    await dbMission.save();
    return dbMission;
}

async function retrieveAllMission() {
    return await Mission.find();
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

async function voteMission(id) {
    const dbMission = await Mission.findById(id);
    if (dbMission){
        dbMission.support += 1;
    }
    await dbMission.save();
    return dbMission;
}

async function unvoteMission(id) {
    const dbMission = await Mission.findById(id);
    if (dbMission){
        dbMission.support -= 1;
    }
    await dbMission.save();
    return dbMission;
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
    deleteAllMission
}