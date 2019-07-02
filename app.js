const { App } = require('@slack/bolt');

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
});


app.use(mbtaObserver);

(async () => {
    await app.start(process.env.PORT || 3005);
    console.log('MBTABot is running!');
})();

function mbtaObserver() {
    // Reverse all messages the app can hear
    app.message(({ message, say }) => {
        say('Helloooooo');
    });
}