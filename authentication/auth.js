const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa');

const authConfig = {
    domain: "dev-cwmo2php.auth0.com",
    audience: "https://graphql-api"
}

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
    }),

    audience: authConfig.audience,
    issuer: `https://${authConfig.domain}/`,
    algorithm: ['RS256']
})

// const checkJwt = jwt({
//     // Dynamically provide a signing key based on the [Key ID](https://tools.ietf.org/html/rfc7515#section-4.1.4) header parameter ("kid") and the signing keys provided by the JWKS endpoint.
//     secret: jwksRsa.expressJwtSecret({
//       cache: true,
//       rateLimit: true,
//       jwksRequestsPerMinute: 5,
//       jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
//     }),
//     // Validate the audience and the issuer.
//     audience: process.env.AUTH0_AUDIENCE,
//     issuer: `https://${process.env.AUTH0_DOMAIN}/`,
//     algorithms: ['RS256']
//   });


module.exports = checkJwt;