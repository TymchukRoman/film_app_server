const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const movieRouter = require('./routes/movie/movieRouter');
const userRouter = require('./routes/user/userRouter');
const mongoose = require('mongoose');

require('dotenv').config()

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on("error", err => {
    console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
    console.log("Mongoose is connected")
})

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json())

app.use('/user', userRouter);
app.use('/movie', movieRouter);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
})

app.listen(port, () => console.log(`Started on ${port}`));