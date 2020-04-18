
importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-messaging.js');

//replace with your api keys
firebase.initializeApp({
  'appId' : '1:606139083720:web:c3217b1041a51d4b5a2efd',
  'apiKey': 'AIzaSyDphJP4eEPv85bLZgD_WmwjIoQjDoudq_0',
  'projectId' : 'lustrous-bond-149109',
  'messagingSenderId': '40911931240'
});


const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.message,
    icon: "https://inorain.com/img/logo.png"
  };

  return self.registration.showNotification(notificationTitle,
      notificationOptions);
});
