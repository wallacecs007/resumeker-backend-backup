const axios = require('axios')

const getUsername = function (req, res, next) {
    console.log('usernameMiddleware running')

    axios.get('https://dev-cwmo2php.auth0.com/userinfo', {headers: {'Authorization': `${req.headers.authorization}`}})
        .then(response => {
            res.locals.username = response.data.sub;
            next()
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({message: 'Error in middleware'})
        })

}

module.exports = getUsername;