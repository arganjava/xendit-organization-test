const express = require('express');
const router = express.Router();
const organizationService = require('../services/organization')

router.post('/', async function (req, res, next) {
    return organizationService.create(req.body)
        .then(value => res.json(value))
        .catch(reason => {
            console.error(reason.message);
            res.status(422).send(reason.message);
        })
});


router.put('/addMember/:organizationId/:memberId', async function (req, res, next) {
    return organizationService.addMember(req.params.organizationId, req.params.memberId)
        .then(value => res.json(value))
        .catch(reason => {
            console.error(reason.message);
            res.status(422).send(reason.message);
        })
});

router.get('/:organizationName/members', async function (req, res, next) {
    return organizationService.getMembers(req.params.organizationName)
        .then(value => res.json(value))
        .catch(reason => {
            console.error(reason.message);
            res.status(422).send(reason.message);
        })
});


module.exports = router;
