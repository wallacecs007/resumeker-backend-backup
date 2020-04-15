const axios = require('axios')
const router = require('express').Router()
const request = require('request')

const checkJwt = require('../authentication/auth.js')
const {getSub} = require('../middleware/auth0calls.js')
const {getToken, config} = require('../data/auth0config')

router.get('/getUser', checkJwt, getSub, async (req, res, next) => {

    const sub = res.locals.sub;
    const token = await getToken();

    var options = {
        method: 'GET',
        url: `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${sub}`,
        headers: {
            authorization: token,
            'content-type': 'application/json'
        },
        json: true,
        jar: 'JAR'
    }

    try {
        request(options, function (error, response, body) {
            if(error) {
                console.log(error)
                res.status(401).json(error)
            }

            res.status(200).json(body)
        })
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }

})

router.patch('/updateUser', checkJwt, getSub, async (req, res, next) => {

    const sub = res.locals.sub;
    const token = await getToken();
    console.log(req.body)

    var options = {
        method: 'PATCH',
        url: `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${sub}`,
        headers: {
          authorization: token,
          'content-type': 'application/json'
        },
        body: req.body,
        json: true,
        jar: 'JAR'
      };

    try {
        
        request(options, function (error, response, body) {
            if(error) {
                console.log(error)
                res.status(401).json(error)
            }

            // console.log(body)
            res.status(200).json(body)
        })

    } catch (err) {
        console.log(err);
        res.status(401).json(err)
    }

})

module.exports = router;
