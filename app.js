const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const morgan = require('morgan');
const helmet = require('helmet')




const app = express();

app.use(morgan('common'));
app.use(helmet());
app.use(cors());

app
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())





module.exports = app;
