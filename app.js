const { App } = require('@slack/bolt');

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.message('knock knock', ({ message, say }) => {
    say(`_Who's there?_`);
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