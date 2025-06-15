require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const connectToDb = require('./utils/db');
const authRoutes = require('./routes/auth');
const initMinio = require('./utils/initMinio');
const documentRoutes = require('./routes/docs');
const cors = require('cors');

const app = express();
const allowedOrigins = ['http://172.236.19.216:3000', 'https://emiratestax.me', 'http://localhost:3000'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.get('/api/healthcheck', (req, res) => {
  res.json({
    status: 'healthy',
    dbConnection: 'active',
    uptime: process.uptime()
  });
});
app.use('/api/auth', authRoutes);
app.use('/api/docs', documentRoutes);
connectToDb();
initMinio();
app.listen(process.env.PORT, "0.0.0.0", ()=>console.log("Server started at PORT: ", process.env.PORT));

