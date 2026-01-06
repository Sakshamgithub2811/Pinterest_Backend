const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT;
const path = require("path");
const connectToDB = require('./config/database');
connectToDB();
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const userRouter = require('./routes/user.routes');
const pagesRouter = require('./routes/pages.routes');

app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/upload', express.static(path.join(__dirname, 'upload')));


app.use('/user',userRouter);
app.use('/page',pagesRouter);

app.get('/',(req,res)=>{
    res.render('./auth/login');
})

app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT} `);
})  