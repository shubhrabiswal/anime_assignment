const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')

const app = express()
dotenv.config();
const PORT = process.env.PORT;

const userRoute = require('../src/router/userRoute')


app.use(express.json())
app.use(bodyParser.json());
app.use(cors())


app.get("/", (req, res) => {
  res.send("working")
});

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to database'))
  .catch(() => console.log('Failed to connect to database.'));

app.use('/api/user', userRoute)

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})