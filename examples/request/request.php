<?php

$request = new HttpRequest();
$request->setUrl('https://192.168.1.170:8020/add');
$request->setMethod(HTTP_METH_POST);

$request->setHeaders(array(
    'postman-token' => 'b97e70f3-ea5d-77ab-64a3-8d7cd15a281f',
));

$request->setContentType('application/x-www-form-urlencoded');
$request->setPostFields(array(
    'sender' => 'Server',
    'tz' => '+6',
    'ip' => '192.168.0.1',
    'message' => 'Message',
    'keyStorage' => '{}',
    'deliveryDate' => '2020-04-18 15:40:10',
    'schedulingTypeId' => '1',
    'title' => 'MyMessage',
    'recipients' => '[
  {
    "clientId":1,
    "push_web":"dW5mSGcenkTIO4u-yUfasB:APA91bHHMhQh6DVjMiBCZzozZnS13VsbRdzpQta1cq7OPG5vocKPbn1FyRN0wLXjdewteNOAmGlfkBbQPldYsmjXD7XiqL0-fGtUoDEf9KKsufmMwPBBb3gxKqklru31m3apNodK5I5z",
    "push_android": "",
    "push_ios": "",
    "push_windows": "",
    "push_macOS" : "",
    "emails" : "root@inorain.com",
    "phone_number" : "+37498041171",
    "options" : {}
  },
  {
    "clientId":2,
    "push_web":"e8kWcM6-oMdH7C-zachXTa:APA91bHfFMkGrXazkxDry5yNdeNHSOzx6eJ5zqBBGXjd09tLFw7d53pCOM3RPk_R_hbLFeRm1AOnGKKeIcqmQxNSC4KDNu38RPnsmckrmGCbHLvpKinnSKa-GHGYoWsBHJBdfPfJAFfy",
    "push_android": "",
    "push_ios": "",
    "push_windows": "",
    "push_macOS": "",
    "emails" : "grigor@inorain.com",
    "phone_number" : "+37494511116",
    "options" : {}
  }
]
'
));

try {
    $response = $request->send();
    echo $response->getBody();
} catch (HttpException $ex) {
    echo $ex;
}
