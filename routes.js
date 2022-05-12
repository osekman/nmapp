const path  = require('path');
const env   = require('dotenv').config({path:path.join(__dirname)+'/.env'});

const VERSION  = process.env.VERSION;

const userController    = require('./controllers/user_controller');

module.exports = function(app, apps){

    // HTTP
    if(app != null){

        // isLive
        app.get('/', function (request, response) { response.send({ status: 200, message: "TEST API V1.0" }); });
        app.post('/', function (request, response) { response.send({ status: 200, message: "TEST API V1.0" }); });

        //user
        app.post(`/login`, userController.login);
        app.post(`/api/${VERSION}/user/getInfo`, userController.getInfo);

        //bulunamayan sayfalarda, bu middleware çalışır
        app.use(function(req, res, next){
            res.status(404).end('Aradığınız sayfa bulunamadı!');
        });

    }

    // HTTPS secure
    if(apps != null){
        // https routes..
    }


}