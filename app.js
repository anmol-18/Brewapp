const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotEnv = require('dotenv');
const csrf = require('csurf')
const userRouter = require('./routes/user.routes')
dotEnv.config();


mongoose.connect( process.env.DB_URL,{ useNewUrlParser : true }).then(
    ()=>{
        console.log("Database is connected");
    },

    (err) =>{
        console.log("can't connect to the database " +err);
    }
)

const csrfProtection = csrf();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use(cors());

app.use('/api', userRouter)


app.listen(3000, () => {
    console.log(`listening on port: ${process.env.PORT}`);
})