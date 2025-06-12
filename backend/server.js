require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const connectToDb = require('./utils/db');
const authRoutes = require('./routes/auth');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use('/api/auth', authRoutes);
connectToDb();

app.listen(process.env.PORT, ()=>console.log("Server started at PORT: ", process.env.PORT));

