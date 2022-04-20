const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
    clientId: process.env.OKTA_CLIENT_ID,
    issuer: process.env.OKTA_ISSUER,
    testing: {
        disableHttpsCheck: process.env.NODE_ENV !== "production"
    }
});

function checkAccessToken(req, res){
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer\s+(\S+)/i);
    if (!match) {
        res.status(401).send('Unauthorized');
        return
    }
    return match[1]
}

function oktaResourceAuthentication(req, res, next) {
    const accessToken = checkAccessToken(req, res);
    const audience = 'api://default';
    return oktaJwtVerifier.verifyAccessToken(accessToken, audience)
        .then((jwt) => {
            req.jwt = jwt;
            next();
        })
        .catch((err) => {
            res.status(401).send(err.message);
        });
}

module.exports = {oktaResourceAuthentication}