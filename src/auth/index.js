const express = require('express');
const {passwordSecret, fakeUser} = require("./data");
const {getTokens, refreshTokenAge} = require('./utils')
const cookie = require("cookie");
const crypto = require("crypto");

const authRouter = express.Router();

authRouter.post("/login", (req, res) => {
    const { login, password } = req.body;

    const hash = crypto
        .createHmac("sha256", passwordSecret)
        .update(password)
        .digest("hex");
    const isVerifiedPassword = hash === fakeUser.passwordHash;

    if (login !== fakeUser.login || !isVerifiedPassword) {
        return res.status(401).send("Login fail");
    }

    const {accessToken, refreshToken} = getTokens(login)

    res.setHeader(
        "Set-cookie",
        cookie.serialize('refreshToken', refreshToken, {
            httpOnly: 'true',
            maxAge: refreshTokenAge
        })
    )
    res.send({accessToken: accessToken})
})

module.exports = authRouter;

