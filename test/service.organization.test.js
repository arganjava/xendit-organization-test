const assert = require('assert');
const organizationService = require('../services/organization')
const organizationModel = require('../models/organization')
const commentOutbound = require('../outbound/comment')

const sinon = require("sinon");

const request = {
    name: "xendit"
}

const resultComments = [{message: "test1"}, {message: "test2"}]
const showComments = [{comment: "test1"}, {comment: "test2"}]

describe('#addOrganization() validate name is mandatory', function () {
    it('should return `name is mandatory` when the name is not present', async function () {
        try {
            await organizationService.create();
        } catch (e) {
            assert.equal(e.message, 'name is mandatory')
        }
    });
});

describe('#addOrganization() name already exist', function () {
    before(() => {
        sinon.stub(organizationModel, "find").returns(Promise.resolve({name: "xendit"}));
    });

    after(function () {
        organizationModel.find.restore(); // Unwraps the spy
    });
    it('should return `name already exist` when the name data is already exist', async function () {
        try {
            await organizationService.create(request);
        } catch (e) {
            assert.equal(e.message, 'name already exist')
        }
    });
});

describe('#addOrganization() success', function () {
    before(() => {
        sinon.stub(organizationModel, "find").returns(Promise.resolve(undefined));
        sinon.stub(organizationModel, "create").returns(Promise.resolve(request));
    });

    after(function () {
        organizationModel.find.restore(); // Unwraps the spy
        organizationModel.create.restore(); // Unwraps the spy
    });
    it('should return `success with object`', async function () {
        let result = await organizationService.create(request);
        assert.equal(result, request)
    });
});

describe('#getOrganizationMember() success', function () {
    before(() => {
        let resultMock = {
            name: "xendit",
            members: [{name: "Argan", totalFollower: 0}, {name: "Mega", totalFollower: 20}]
        }
        sinon.stub(organizationModel, "findOne").returns(Promise.resolve(resultMock));
    });

    after(function () {
        organizationModel.findOne.restore(); // Unwraps the spy
    });
    it('should return `success with object`', async function () {
        let result = await organizationService.getMembers(request.name);
        let resultSort = {
            name: "xendit",
            members: [{name: "Mega", totalFollower: 20}, {name: "Argan", totalFollower: 0}]
        }
        assert.deepEqual(result, resultSort)
    });
});

describe('#organization() add comment', function () {
    before(() => {
        sinon.stub(organizationModel, "find").returns(Promise.resolve(request));
        sinon.stub(commentOutbound, "addComment").returns(Promise.resolve(resultComments));
    });

    after(function () {
        organizationModel.find.restore(); // Unwraps the spy
        commentOutbound.addComment.restore(); // Unwraps the spy
    });
    it('should return `success with object`', async function () {
        let result = await organizationService.addComment(request);
        assert.equal(result, resultComments)
    });
});

describe('#organization() show comment', function () {
    before(() => {
        sinon.stub(organizationModel, "find").returns(Promise.resolve(request));
        sinon.stub(commentOutbound, "showComments").returns(Promise.resolve(resultComments));
    });

    after(function () {
        organizationModel.find.restore(); // Unwraps the spy
        commentOutbound.showComments.restore(); // Unwraps the spy
    });
    it('should return `success with object`', async function () {
        let result = await organizationService.showComments(request);
        assert.deepEqual(result, showComments)
    });
});

describe('#organization() delete comment', function () {
    before(() => {
        sinon.stub(organizationModel, "find").returns(Promise.resolve(request));
        sinon.stub(commentOutbound, "deleteAllComments").returns(Promise.resolve([]));
    });

    after(function () {
        organizationModel.find.restore(); // Unwraps the spy
        commentOutbound.deleteAllComments.restore(); // Unwraps the spy
    });
    it('should return `success with object`', async function () {
        let result = await organizationService.deleteAllComments(request);
        assert.deepEqual(result, [])
    });
});