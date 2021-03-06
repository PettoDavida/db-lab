require("dotenv").config();

const express = require('express')
const mongoose = require('mongoose');
const cors = require("cors");

const app = express()
const port = 3000

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', (err) => {
    console.log("Mongoose Error");
    console.log(err);
});

db.once('open', () => console.log("Connected to database"));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const userRouter = require("./routes/users");
const postRouter = require("./routes/posts"); 

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

