require('dotenv').config();
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors');

const authRouter = require('./src/auth')
const {getTokens} = require("./src/auth/utils");

const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true, // Разрешить отправку куки и заголовков аутентификации
    origin: 'http://localhost:3000'
}))

app.use(authRouter);

const PORT = process.env.PORT;

start = async () => {
    try {
        app.listen(PORT, () => console.log(`server is started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();