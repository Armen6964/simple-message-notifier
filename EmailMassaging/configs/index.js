const CONFIG  = {
     enabled: false,
     smtps:[
            {
                host: "smtp.yandex.ru",
                port : 465,
                secure: true,
                username : "you'r email",
                password : "your'r password",
                rejectUnauthorized : false

            },
            {
                host: "smtp 2",
                port : 465,
                secure: true,
                username : "you'r email",
                password : "your'r password",
                rejectUnauthorized : false
            },
            {
                host: "smtp 3",
                port : 465,
                secure: true,
                username : "you'r email",
                password : "your'r password",
                rejectUnauthorized : false
            }
        ],
};
module.exports = CONFIG;
