const assert = require('assert');
const organizationService = require('../services/organization')
const organizationModel = require('../models/organization')
const sinon = require("sinon");

const request = {
    name: "xendit"
}

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
