const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require('./routes/userRouter');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/user', userRouter);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
})

app.listen(port, () => console.log(`Started on ${port}`));