const axios = require('axios')
const router = require('express').Router()

const checkJwt = require('../authentication/auth.js')
const getUsername = require('../middleware/auth0calls.js')
const Users = require('./user-model.js')

router.get('/checkuser', checkJwt, getUsername, (req, res, next) => {

    const username = res.locals.username;

    Users.findByUsername(username)
        .then(user => {
            if(user.length != 0) {
                res.status(200).json({existing: true})
            } else {
                res.status(200).json({existing: false})
            }
        })
        .catch(err => {
            res.status(500).json({message: 'Failed to get schemes'})
        })
})

router.get('/user', checkJwt, getUsername, (req, res, next) => {

    const username = res.locals.username

    Users.findByUsername(username)
        .then(user => {
            if(user.length != 0) {
                res.status(200).json(user)
            } else {
                res.status(400).json({error: 'Failed to find user'})
            }
        })
        .catch (err => {
            res.status(500).json({message: 'Failed to get schemes'})
        })

})

router.post('/user', checkJwt, getUsername, (req, res) => {

    console.log('Middleware Username Check Passed')

    const username = res.locals.username;
    let user = req.body.user;
    user['username'] = username;

    Users.addUser(user)
        .then(newUser => {
            res.status(201).json(newUser)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'Failed to add user to database'})
        })

})


module.exports = router;
