console.log('The follow bot is starting')

const Twit = require('twit');
const config = require('./config');

let T = new Twit(config)

//Set up user stream
let stream = T.stream('user');

//Anytime someone follows me
stream.on('follow', followed);

function followed(eventMsg) {
    console.log('follow event!')
    let name = eventMsg.source.name;
    let screenName = eventMsg.source.screen_name;
    tweetIt('@' + screenName + ' Thanks for following booo, check out TweetCollage.com <3')
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