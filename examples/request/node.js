const request = require("request");

let options = { method: 'POST',
    url: 'https://192.168.1.170:8020/add',
    headers:
        {'content-type': 'application/x-www-form-urlencoded' },
    form:
        { sender: 'Server',
            tz: '+6',
            ip: '192.168.0.1',
            message: 'Message',
            keyStorage: '{}',
            deliveryDate: '2020-04-18 15:40:10',
            schedulingTypeId: '1',
            title: 'MyMessage',
            recipients: '[ { "clientId":1,"push_web":"dW5mSGcenkTIO4u-yUfasB:APA91bHHMhQh6DVjMiBCZzozZnS13VsbRdzpQta1cq7OPG5vocKPbn1FyRN0wLXjdewteNOAmGlfkBbQPldYsmjXD7XiqL0-fGtUoDEf9KKsufmMwPBBb3gxKqklru31m3apNodK5I5z",\n    "push_android": "",\n    "push_ios": "",\n    "push_windows": "",\n    "push_macOS" : "",\n    "emails" : "root@inorain.com",\n    "phone_number" : "+37498041171",\n    "options" : {}\n  },\n  {\n    "clientId":2,\n    "push_web":"e8kWcM6-oMdH7C-zachXTa:APA91bHfFMkGrXazkxDry5yNdeNHSOzx6eJ5zqBBGXjd09tLFw7d53pCOM3RPk_R_hbLFeRm1AOnGKKeIcqmQxNSC4KDNu38RPnsmckrmGCbHLvpKinnSKa-GHGYoWsBHJBdfPfJAFfy",\n    "push_android": "",\n    "push_ios": "",\n    "push_windows": "",\n    "push_macOS": "",\n    "emails" : "grigor@inorain.com",\n    "phone_number" : "+37494511116",\n    "options" : {}\n  }\n]\n' } };

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});
