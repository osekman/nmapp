const md5   = require("md5");
const jwt   = require("jsonwebtoken");

// Bu key jwt çözümü/doğrulaması için kullanılır
const secret_key = '/*!213258#$%9875+&*/';

module.exports = {
    login: async function (request, response) {

        const username      = request.body.username;
        const password      = md5(request.body.password);
    
        try {
            
            //login islemleri

            const payLoad = {company_data : "test_bilisim", user_data: username  }; //token içerisinde gönderilecek data..
            const token = jwt.sign(payLoad, secret_key, { expiresIn: 24*60*60 }); // 1 gun geçerli

            //headera gömdük
            response.set("Token", token); 
            
            response.send({ status: 200, message: "OK!", payLoad:payLoad});
           
        } catch (error) {
            response.send( { status: 400, message: error.message});
        }

    },
 
    getInfo: async function (request, response) {

        const username    = request.body.decode.user_data;
    
        try {
            
            //getting user data

            response.send({ status: 200, user_data:username});
           
        } catch (error) {
            response.send( { status: 400, message: error.message});
        }

    },
 

   

}
 
