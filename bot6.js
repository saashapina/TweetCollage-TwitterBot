console.log('The image replier bot is starting')

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

    console.log('from ' + from + ' ' + 'to ' + replyto);

    if (replyto === 'TweetCollageApp') {
        const r = Math.floor(Math.random()*1000)
        let newtweet = 'Wasssup! @' + from + ' Make your tweet collage at TweetCollage.com, Today you are ' + r + 'x Awesome!' 
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
            console.log ("Something went wrong :(");
        } else {
            console.log("It worked ;) ")
        }
        
    };
}