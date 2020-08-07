const COMMENT_URL = process.env.COMMENT_URL || "http://127.0.0.1:3001/"
const COMMENT_PATH = "comment"
const axios = require('axios');

const CommentOutbound = {
    addComment: addComment,
    deleteAllComments: deleteAllComments,
    showComments: showComments
}


async function addComment(request) {
    return axios({
        method: 'post',
        url: COMMENT_URL + COMMENT_PATH,
        data: {
            organization: request.organization,
            message: request.comment
        }
    }).then(value => {
        console.log(value.data)
        return value.data
    }).catch(reason => {
        console.error(reason)
        throw new Error(reason.message);
    });
}

async function deleteAllComments(organization) {
    return axios({
        method: 'delete',
        url: COMMENT_URL + COMMENT_PATH + '/deleteAllComments' + "/" + organization
    }).then(value => {
        console.log(value.data)
        return value.data
    }).catch(reason => {
        console.error(reason)
        throw new Error(reason.message);
    });
}

async function showComments(organization) {
    return axios({
        method: 'get',
        url: COMMENT_URL + COMMENT_PATH + "/" + organization
    }).then(value => {
        console.log(value.data)
        return value.data
    }).catch(reason => {
        console.error(reason)
        throw new Error(reason.message);
    });
}

module.exports = CommentOutbound