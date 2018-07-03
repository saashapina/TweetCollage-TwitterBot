console.log('The tweet images every 30min bot is starting')

const Twit = require('twit');
const path = require('path');
const config = require(path.join(__dirname, '/config'));
const fs = require('fs');

let T = new Twit(config)




function random_from_array(images) {
    return images[Math.floor(Math.random() * images.length)];
}

function upload_random_image(images) {
    console.log('Opening an image..');
    let image_path = path.join(__dirname, '/images/' + random_from_array(images)),
        b64content = fs.readFileSync(image_path, { encoding: 'base64' });

    console.log('uploading an image..');

    T.post('media/upload', { media_data: b64content }, function (err, data, response) {
        if (err){
          console.log('ERROR:');
          console.log(err);
        }
        else{
          console.log('Image uploaded!');
          console.log('Now tweeting it...');
    
          T.post('statuses/update', {
            status: random_from_array([
                'Hey check out this cool TweetCollage pic!',
                'Super Cool!',
                'If TweetCollage isnt the coolest app I dont know what is'
            ]),
            media_ids: new Array(data.media_id_string)
          },
            function(err, data, response) {
              if (err){
                console.log('ERROR:');
                console.log(err);
              }
              else{
                console.log('Posted an image!');
              }
            }
          );
        }
      });
    }

    fs.readdir(__dirname + '/images', function(err, files) {
        if (err){
          console.log(err);
        }
        else{
          var images = [];
          files.forEach(function(f) {
            images.push(f);
          });
      
          setInterval(function(){
            upload_random_image(images);
          }, 1000*60*5);
        }
      });