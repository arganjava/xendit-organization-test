const express = require('express');
const router = express.Router();
const memberService = require('../services/member')

router.post('/', async function (req, res, next) {
    return memberService.create(req.body)
        .then(value => res.json(value))
        .catch(reason => {
            console.error(reason.message);
            res.status(422).send(reason.message);
        })
});

module.exports = router;
