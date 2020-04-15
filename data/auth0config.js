const axios = require('axios');


const requestBody = {
    client_id: process.env.M2M_CLIENT_ID,
    client_secret: process.env.M2M_CLIENT_SECRET,
    audience: process.env.M2M_AUDIENCE,
    grant_type: 'client_credentials',
}

const baseUrl = `https://${process.env.AUTH0_DOMAIN}/api/v2`


const config = token => ({
    baseUR: baseUrl,
    headers: {
        Authorization: token,
    },
});

//Retrieves Access Token for Auth0 Management API
async function getToken() {
    const res = await axios(options)
    return `Bearer ${res.data.access_token}`
}

const options = {
    method: 'post',
    url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    headers: {'content-type': 'application/json'},
    data: {
        "client_id":process.env.M2M_CLIENT_ID,
        "client_secret":process.env.M2M_CLIENT_SECRET,
        "audience":process.env.M2M_AUDIENCE,
        "grant_type":"client_credentials"
    }
}

module.exports = { config, getToken};