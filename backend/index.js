const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')


// connected to moongoose data base
connectToMongo();
const app = express()
const port = 5000
app.use(cors())
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/note',require('./routes/note'))

// app.get('/', (req, res) => {
//   res.send('hello world')
// })

app.listen(port)