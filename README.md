<p>Installation...</p>

`npm install -g --save simple-message-notifier`

<p>Or</p>

`git clone https://github.com/Armen6964/simple-message-notifier.git`



<h3>Https Server and database configuration</h3>

<p><b>Warning</b> https server required for push notifications</p>

`open ./config/global.js file`

`const port = 8020; //change you'r server port here`

`{`

  `host: 'localhost', //enter you'r mysql host`
  
  `username: 'q', //enter you'r mysql username`
  
  `password: 'q', //enter you'r mysql password`
  
  `database: 'kanban', //enter you'r database name`
  
  `dialect: 'mysql', //this server only work with mysql database so dont't edit this line`
  
  `logging: false //Enable/Disable logging in console from sequelize`
 `;`
 
 `{` 
     `intervalInSeconds : 2, //update messageing sheduling time` 
 
     `https : {`
         
         `isEnabled : true, //enable or disable https`
          
         `keys : {`
     
             `ca : fs.readFileSync(__dirname+"/certs/ca.pem","utf-8"),` //setup path to your real ca.pem file
             
             `private : fs.readFileSync(__dirname+"/certs/private.key","utf-8"),` //setup path to your real private.pem file
            
             `cert : fs.readFileSync(__dirname+"/certs/cert.pem","utf-8")` //setup path to your real cert.pem file
     
        `}`
     
     `},`
 `};`


<h3>Firebase google push notifications configurations</h3>

<ol>
  <li>open **https://console.developers.google.com/apis/credentials**</li>
  <li>click **Create credentials** </li>
  <li>choose from list service account</li>
  <li>fill all fields and click **create**</li>
  <li>setup roles and click **continue**</li>
  <li>click **create key**</li>
  <li>in right side popup choose json and press create</li>
  <li>rename file to **google-configs.json**</li>
  <li>copy file and past it to project **FirebaseMessaging/configs/** folder</li>
  <li>open **FirebaseMessaging/configs/configs.js** isEnabled to **true**</li>
</ol>


<h3>Email messaging configuration</h3>

<ol>
  <li>open **EmailMessaging/configs/index.js**</li>
  <li>in configs.smtps array add you'r smtp credentials</li>
  <li>set enabled to **true** in config file</li>
</ol>


<h3>Sms messaging configurations with twilio.com</h3>

<ol>
  <li>open **https://twilio.com** and register</li>
  <li>after registration open **https://www.twilio.com/console/project/settings** and 
      copy you'r account sid and auth token from account.. twilio also wile give you phone number
  </li>
  <li>open in project **TwillioSMsMessaging/config.js**</li>
  <li>update from to you'r phone number and update accountSid and authToken with your's</li>
  <li>set enabled to true in config file</li>
</ol>


<h3>Request to server for adding new message to Queues</h3>

<p>Request url</p>

`host : https://{you'r host}:{your'r port}/add`

<p>Parameters</p>

<table>
    <thead>
        <tr>
            <td>Name</td>
            <td>Value</td>
            <td>Description</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>sender</td>
            <td>Name of sender service or user</td>
            <td>string(default value is UNKNOWN)</td>
        </tr>
        <tr>
            <td>*tz</td>
            <td>+4,-1,+2</td>
            <td>string(timezone of the clients)</td>
        </tr>
        <tr>
            <td>*ip</td>
            <td>192.168.0.1</td>
            <td>string (Ip address of sender)</td>
        </tr>
        <tr>
            <td>message</td>
            <td>My cool notification</td>
            <td>string(message body)</td>
        </tr>
        <tr>
            <td>keyStorage</td>
            <td>["data":{}]</td>
            <td>JSON(data that will return to client with socket body)</td>
        </tr>
        <tr>
            <td>deliveryDate</td>
            <td>2020-04-18 15:40:10</td>
            <td>Date</td>
        </tr>
         <tr>
            <td>*schedulingTypeId</td>
            <td>
                <ul>
                    <li>1. immediately send message</li>
                    <li>2. sending message after deliveryDate</li>
                    <li>3. sending message every day at time of deliverDate</li>
                    <li>4. sending message every month at time of deliveryDate</li>
                    <li>5. sending message every year at time of deliveryDate</li>
                </ul>
            </td>
            <td>integer(Scheduling type)</td>
        </tr>
         <tr>
            <td>title</td>
            <td>MyMessage</td>
            <td>string(Title of notification and name of socket event that can't be handled in client side)</td>
        </tr>
         <tr>
            <td>recipients</td>
            <td>
            
                        [{
                 
                                   "clientId": 1, 
                                   
                                   "push_web": "",
                                   
                                   "push_android": "",
                                   
                                   "push_ios": "",
                                   
                                   "push_windows": "",
                                   
                                   "push_macOS": "",
                                   
                                   "emails": "example@example.com",
                                   
                                   "phone_number": "+3740000000",
                                   
                                   "options": {}
                                  
                                  }]
</td>
            <td>Array of object with recipients list</td>
        </tr>
    </tbody>
</table>

<h4>Examples with request in popular languages you can find in /examples/request</h4>


<h3> Socket.io simple api</h3>

<p>This api is implemented for keeping server resources for immediately notifications </p>
<p>If client side is connected to socket it will receive immediately messages by socket if
 not connected then client will receive information by sms,push and email</p>
<h4>How to connect with socket?</h4>

<p>
    From client side after socket.io is connected send event **join** to server
    
     let object = {id : 1,name : 'Name',surname : 'Surname'}
     socket.emit("join",object)
</p>

<p>
    Connection confirmation from server you can handle by event **connected**    
    
     socket.on("connected",(data)=>{
        console.log("SOCKET CONNECTED WITH SERVER...");
        console.log(data);
     });

</p>

<p>How to handel socket io server events on client side?</p>
<p>{title} of the message is the event name for handling</p>

<p>Example...</p>
<p>
    You have request to add new notification queue by title **example** you can handle
    
    socket.on("example",(data=>{
        console.log(data);
    })
    
</p>


<b>TODO list</b>
<ul>
   <li><del>Https support with minimal configs</del></li>
   <li><del>Google firebase implementation</del></li>
   <li><del>Web push notification</del></li> 
   <li><del>Socket messaging</del></li> 
   <li><del>SMS notifications with twilio</del></li> 
   <li><del>Email notifications</del></li>
   <li><del>Examples on web how to deal with server</del></li>
   <li><del>Scheduled messages every day</del></li>
   <li><del>Scheduled messages every year</del></li>
   <li><del>Scheduled messages every month</del></li>
   <li><del>Scheduled messages after some date</del></li>
   <li><del>Immediately messages</del></li>
   
   <li>iOS notifications</li>
   <li>Android mobile notification</li>
   <li>Windows notification</li>
   <li>MacOs notification</li>
</ul>
