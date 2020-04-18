<p>Installation...</p>

`npm install -g --save simple-message-notifier`

<p>Or</p>

`git clone https://github.com/Armen6964/simple-message-notifier.git`



<h3>Https Server and database configuration</h3>

<p><b>Warning</b> https server required for push notifications</p>

`open ./config/global.js file`

`const port = 8020; //change you'r server host here`

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
