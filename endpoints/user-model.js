const db = require('../data/dbconfig.js')

module.exports = {
    findByUsername,
    addUser,
}

function findByUsername(username) {
    return db('users').where('username', username)
}

function findById(id) {
    return db('users').where({id})
}

async function addUser(user) {
    const [id] = await db('users').insert(user)
    return findById(id)
}


