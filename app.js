const { App } = require('@slack/bolt');
var EventSource = require("eventsource");

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.message('knock knock', ({ message, say }) => {
    var evtSource = new EventSource("//api-v3.mbta.com/predictions/", { withCredentials: true } );
    evtSource.onmessage = function(e) {
        say(e.data);
      }
  });


(async () => {
    await app.start(process.env.PORT || 3005);
    console.log('MBTABot is running!');
})();

function mbtaObserver() {
    // Reverse all messages the app can hear
    app.client.chat.postMessage({
        token: context.botToken,
        channel: 'CKVBG7NHX',
        text: `Welcome to the team!`
      });
}