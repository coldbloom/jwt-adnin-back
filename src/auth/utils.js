const jwt = require("jsonwebtoken");

const signatureAccess = "My_sup3r_s3cr3t_access"; // в проде хранить в переменной в node.env
const signatureRefresh = "My_sup3r_s3cr3t_refresh";

const accessTokenAge = 20; //s
const refreshTokenAge = 60 * 60; //s (1h)

const getTokens = (login) => ({
    accessToken: jwt.sign({ login }, signatureAccess, {expiresIn: `${accessTokenAge}s`}),
    refreshToken: jwt.sign({ login }, signatureRefresh, {expiresIn: `${refreshTokenAge}s`})
});

const verifyAuthorizationMiddleware = (req, res, next) => {
    const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : "";

    if (!token) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, signatureAccess);
        req.user = decoded;
    } catch (err) {
        return res.sendStatus(401)
    }
    return next();
}

module.exports = {
    getTokens,
    verifyAuthorizationMiddleware,
    refreshTokenAge,
    accessTokenAge,
};
