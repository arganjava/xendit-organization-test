const OrganizationModel = require('../models/organization')
const MemberModel = require('../models/member')

const OrganizationService = {
    create: createOrganization,
    addMember: addMember,
    getMembers: getMembers
}

async function createOrganization(request) {
    return validateCreate(request).then(existData => proceedCreate(existData, request));
}

async function proceedCreate(existData, request) {
    if (existData == undefined || existData.length == 0) {
        console.log("existData $ ", existData, request)
        return OrganizationModel.create({name: request.name})
    }
    throw new Error('name already exist');
}

async function validateCreate(request) {
    if (request === undefined || request.name === '') {
        throw new Error('name is mandatory');
    }
    return findOrganizationByName(request.name);
}

function findOrganizationByName(name) {
    return OrganizationModel.find({name: name});
}

async function validateAddMember(organizationId, memberId) {
    let organization = await OrganizationModel.findById(organizationId).exec();
    let member = await MemberModel.findById(memberId).exec();
    console.log("validateAddMember ", organization, member);
    if (!organization) {
        throw new Error('organization not found');
    } else if (!member) {
        throw new Error('member not found');
    }
    return member;
}

async function addMember(organizationId, memberId) {
    return validateAddMember(organizationId, memberId).then(member =>
        OrganizationModel.findByIdAndUpdate(organizationId,
            {$addToSet: {members: member}}))
        .then(value => OrganizationModel.findById(organizationId).exec());
}

async function getMembers(organizationName) {
    return OrganizationModel.findOne({name: organizationName})
        .then(result => {
            result.members.sort((a, b) => {
                return b.totalFollower - a.totalFollower;
            })
            return Promise.resolve(result);
        });

}

module.exports = OrganizationService