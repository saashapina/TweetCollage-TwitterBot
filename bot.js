console.log('The get tweet bot is starting')

const Twit = require('twit');
const config = require('./config');

let T = new Twit(config)

const params = {
    q: 'saashapina', 
    count: 10 
}

T.get('search/tweets', params, gotData)

function gotData(err, data, response) {
    let tweets = data.statuses;
    for (let i=0; i < tweets.length; i++) {
        console.log(tweets[i].text)
    }
  };



