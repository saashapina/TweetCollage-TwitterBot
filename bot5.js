console.log('The tweet every 20sec bot is starting')

const Twit = require('twit');
const config = require('./config');

let T = new Twit(config)


setInterval(tweetIt, 1000*20) //every 20 secons
tweetIt();

function tweetIt(txt) {

    const r = Math.floor(Math.random()*100);
    const thistweet = {
        status: 'Wassup number ' + r + ' TweetCollage is awesome :)'
    }

    const tweet = {
        status: txt
    }

    T.post('statuses/update', thistweet, tweeted);


    function tweeted(err, data, response) {
        if (err) {
            console.log ("Some shit went wrong :(");
        } else {
            console.log("It worked ;) ")
        }
        
    };
}