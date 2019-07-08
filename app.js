const { App } = require('@slack/bolt');
var EventSource = require("eventsource");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.message('knock knock', ({ message, say }) => {
  var eventSourceInitDict = { headers: { 'accept': 'text/event-stream', 'x-api-key': '77908788c1bc4fbbacb489f5bc7907cf' } };
  var evtSource = new EventSource("https://api-v3.mbta.com/predictions/?filter\\[stop\\]=place-sstat&stop_sequence=1", eventSourceInitDict);
  console.log('registered', evtSource); ''
  evtSource.addEventListener('message', function (e) {
    console.log(e.data);
  }, false);
  evtSource.onerror = function (err) {
    console.log(err);
  };
});


(async () => {
  await app.start(process.env.PORT || 3005);
  console.log('MBTABot is running!');
  var ess = require('event-source-stream');
  var eventSourceInitDict = { headers: { 'accept': 'text/event-stream', 'x-api-key': '77908788c1bc4fbbacb489f5bc7907cf' } };
  ess('https://api-v3.mbta.com/alerts', eventSourceInitDict).on('data', data => {
      console.log('received event:', data);
  });
  console.log("test");
})();

function mbtaObserver() {
  // Reverse all messages the app can hear
  app.client.chat.postMessage({
    token: context.botToken,
    channel: 'CKVBG7NHX',
    text: `Welcome to the team!`
  });
}