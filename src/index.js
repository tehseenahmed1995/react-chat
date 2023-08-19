import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'pusherkey',
  wsHost: 'staging.tasteeapp.com',
  wsPort: 80,
  wssPort: 443,
  disableStats: true,
  encrypted: true,
  cluster: 'tls',
  forceTLS: true,
  authEndpoint: "https://staging.tasteeapp.com/broadcasting/auth",
  enabledTransports: ['ws', 'wss'], 
  auth:
    {
        headers:
        {
            'Authorization': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            'Accept' : 'application/json' ,       
        }
    }
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// window.Echo.join(`presence-broadcast-message`)
//     .listen('.getChatMessage', (e) => {
//         console.log(e);
//     });
const userId = 1;
    window.Echo.join(`broadcast-restaurant-message.${userId}`)
    .here((users) => {
      console.log(users);
    })
    .joining((user) => {
        console.log(user);
    })
    .leaving((user) => {
        console.log(user);
    })
    .listen('.getChatMessage', (e) => {
      console.log(e);
    })
    .error((error) => {
        console.log(error);
    });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
