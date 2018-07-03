console.log('The replier bot is starting')

const Twit = require('twit');
const config = require('./config');

let T = new Twit(config)

//Set up user stream
let stream = T.stream('user');

//Anytime someone follows me
stream.on('tweet', tweetEvent);

function tweetEvent(eventMsg) {
    //    let fs = require('fs');
    //    let json = JSON.stringify(eventMsg,null,2);
    //    fs.writeFile("tweet.json", json);
    let replyto = eventMsg.in_reply_to_screen_name;
    let text = eventMsg.text;
    let from = eventMsg.user.screen_name;

    console.log('to ' + replyto + ' ' + 'from ' + from);

    if (replyto === 'TweetCollageApp') {
        let newtweet = 'Wasssup! @' + from + ' Make your tweet collage at TweetCollage.com!'
        tweetIt(newtweet);
    }
}

function tweetIt(txt) {

    const tweet = {
        status: txt
    }

    T.post('statuses/update', tweet, tweeted);


    function tweeted(err, data, response) {
        if (err) {
            console.log ("Some shit went wrong :(");
        } else {
            console.log("It worked ;) ")
        }
        
    };
}