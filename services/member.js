const MemberModel = require('../models/member')
const MemberService = {
    create: createMember
}

async function createMember(request) {
    return validateCreate(request)
        .then(value => {
            if (value == undefined || value.length == 0) {
                return MemberModel.create(buildMember(request))
            }
            throw new Error('name already exist');
        });
}

function buildMember(request) {
    return {
        name: request.name,
        avatarUrl: request.avatarUrl,
        totalFollower: request.totalFollower,
        totalFollowerTo: request.totalFollowerTo
    };
}

async function validateCreate(request) {
    if (request === undefined || request.name === '') {
        throw new Error('name is mandatory');
    }
    return findMemberByName(request.name);
}
 function findMemberByName(name) {
    return MemberModel.find({name: name});
}

module.exports = MemberService