const axios = require('axios')

const getSub = function (req, res, next) {
    console.log('usernameMiddleware running')

    axios.get('https://dev-cwmo2php.auth0.com/userinfo', {headers: {'Authorization': `${req.headers.authorization}`}})
        .then(response => {
            res.locals.sub = response.data.sub;
            // console.log(res.locals.sub)
            next()
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({message: 'Error in middleware'})
        })

}

module.exports = {getSub};