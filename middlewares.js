const utilController = require('./controllers/util_controller');
const path           = require('path');
const fs             = require('fs');
const jwt            = require("jsonwebtoken");

// Bu key jwt çözümü/doğrulaması için kullanılır
const secret_key = '/*!213258#$%9875+&*/';

const excToken = [
   "/",
   "/login", //monolith
   "/api/v1/user/login"
];

module.exports = {

    log : function (req, res, next) {
        //req.requestTime = Date.now()
     
        //loglanmayacak endpointler
        var exc = [
            "/api/v1/product/find",  //temsili
        ];

        var gun = utilController.getCurrentTime(0);
        var log_path = path.join(__dirname, "./logs/" + gun + ".log");
     
        var ip = req.socket.remoteAddress || null;
        var send = res.send;
        res.send = function (string) {

            // sadece response anında log alsın istedik.
           var resBody = string instanceof Buffer ? string.toString() : string;
           if(typeof resBody == "string"){
     
              if(!exc.includes(req.path)){
                 var content = `[ ${utilController.getCurrentTime(1)} ] ${ip} ${req.method} ${req.path} \n\t Request : ${JSON.stringify(req.body)} \n\t Response : ${resBody} \n`;
                 fs.writeFile(log_path, content, { flag: 'a+' }, err => {
                    if (err) {
                       console.error(err)
                       next();
                    }
                    //file written successfully
                 })
              }
              
           }
          
           
           send.call(this, resBody);
        }
        
        next();
      
    },

    tokenValidation: function (req, res, next) {

        if(!excToken.includes(req.path)){

            let token = req.get("Token");
            if(!token){
               res.status(401);
               res.send({status:401, message:"Lütfen giriş yapınız!"});
            } else {
               jwt.verify(token, secret_key, (error, decoded) => {
                  if (error){
                    res.status(401);
                    res.send({ status: 401, message: "HATA OLUŞTU! ERR: " + error});  
                  } else {
                    req.body.decode = decoded;
                    next();
                  }
               });
            }
            
        }else{
           next();
        }
      
    },

    test: function (req, res, next) {
       // console.log("test from middle");
       next()
    }

}