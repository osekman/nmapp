const http        = require('http');
const compression = require('compression')
const express     = require('express');
const bodyParser  = require('body-parser');
const path        = require('path');
const fs          = require('fs');
const cors        = require('cors');
const env         = require('dotenv').config({path:path.join(__dirname)+'/.env'});

const PORT        = process.env.PORT;

require('events').EventEmitter.defaultMaxListeners = 100;

///////////////////////////////////////
//////////// SERVERS //////////////////
///////////////////////////////////////

//-------- HTTP -----
const app = express();
app.use(cors());
app.use(compression());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
   bodyParser.json()(req, res, (err) => {
       if (err) {
           console.log(err);
           res.sendStatus(400);
           return;
       }
       next();
   });
});
//statik dosyalar için middleware
//app.use("/tmp", express.static(path.join(path.resolve(__dirname, '..', '..'), 'tmp')));

http.createServer(app).listen(PORT, function () {
   console.log(" >>>> Port dinleniyor ::"+PORT);
});

//  ===== MIDDLEWARES =====
const mw = require('./middlewares');

app.use( mw.log ); // loglama
app.use( mw.tokenValidation ); // giriş kontrol..
app.use( mw.test ); // test

//    ===== ROUTING =====
//require('./routes')(app, apps);
require('./routes')(app, null);
