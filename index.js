const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const auth =require('./routes/auth.js')
const admin =require('./routes/admin.js')
const public =require('./routes/public.js')
const user =require('./routes/user.js')

const app = express();

// Middleware
app.use(bodyParser.json());
// app.use(cors());
app.use(cors())

// Routes
app.use('/',auth);
app.use('/admin',admin);
app.use('/public',public);
app.use('/user',user);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port 5000"));