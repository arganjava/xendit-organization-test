const assert = require('assert');
const memberService = require('../services/member')
const memberModel = require('../models/member')
const sinon = require("sinon");

const request = {
    name: "Argan",
    avatarUrl: "avatarUrl",
    totalFollower: "totalFollower",
    totalFollowerTo: "totalFollowerTo"
}

describe('#addMember() validate name is mandatory', function () {
    it('should return `name is mandatory` when the name is not present', async function () {
        try {
            await memberService.create();
        } catch (e) {
            assert.equal(e.message, 'name is mandatory')
        }
    });
});

describe('#addMember() name already exist', function () {
    before(() => {
        sinon.stub(memberModel, "find").returns(Promise.resolve({name: "Argan"}));
    });

    after( function () {
        memberModel.find.restore(); // Unwraps the spy
    });
    it('should return `name already exist` when the name data is already exist', async function () {
        try {
            await memberService.create(request);
        } catch (e) {
            assert.equal(e.message, 'name already exist')
        }
    });
});

describe('#addMember() success', function () {
    before(() => {
        sinon.stub(memberModel, "find").returns(Promise.resolve(undefined));
        sinon.stub(memberModel, "create").returns(Promise.resolve(request));
    });

    after( function () {
        memberModel.find.restore(); // Unwraps the spy
        memberModel.create.restore(); // Unwraps the spy
    });
    it('should return `success with object`', async function () {
        let result =  await memberService.create(request);
        assert.equal(result, request)
    });
});
