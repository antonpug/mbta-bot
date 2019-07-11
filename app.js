const { App } = require('@slack/bolt');
var EventSource = require('eventsource');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});


(async () => {
  await app.start(process.env.PORT || 3005);
  console.log('MBTABot is running!');
  var eventSourceInitDict = { headers: { 'accept': 'text/event-stream', 'x-api-key': '77908788c1bc4fbbacb489f5bc7907cf' } };
  var es = new EventSource('https://api-v3.mbta.com/alerts/?filter[route_type]=0,1,2', eventSourceInitDict);
  es.addEventListener('update', updateHandler);
})();

  function updateHandler(event) {
    const alert = JSON.parse(event.data).attributes.header;
    console.log(alert);
    if (alert.includes('delay') || alert.includes('behind')) {
      app.client.chat.postMessage({
        token: process.env.SLACK_BOT_TOKEN,
        channel: 'CKQA0PF51',
        text: alert
      });
    }
  }