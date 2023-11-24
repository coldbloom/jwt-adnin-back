const jwt = require("jsonwebtoken");

const signatureAccess = "My_sup3r_s3cr3t_access"; // в проде хранить в переменной в node.env
const signatureRefresh = "My_sup3r_s3cr3t_refresh";

const accessTokenAge = 20; //s
const refreshTokenAge = 60 * 60; //s (1h)

const getTokens = (login) => ({
    accessToken: jwt.sign({ login }, signatureAccess, {expressIn: `${accessTokenAge}s`}),
    refreshToken: jwt.sign({ login }, signatureRefresh, {expressIn: `${refreshTokenAge}s`})
});

module.exports = {
    getTokens
};
