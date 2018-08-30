//  API KEYS SETUP
const keys = require("./keys");

const Twitter = require("twitter");
const Spotify = require("node-spotify-api");

const twitter = new Twitter(keys.twitter);
const spotify = new Spotify(keys.spotify)

module.exports = {
    spotify : function(search) {
        spotify.search({ type: "track", query: search })
            .then((resp) => {
                let song = resp.tracks.items[0]
                let songDeets = {
                    name: song.name,
                    artist: song.album.artists[0].name,
                    album: song.album.name,
                    preview: song.external_urls.spotify,
                }
                console.log(songDeets);
            })
            .catch((err) => {
                throw err;
            });
    },
    twitter : function() {
        twitter.get('statuses/user_timeline', { count: 20 }, (err, tweets, resp) => {
            if (err) throw err;
            console.log(`Your last 20 tweets:`);
            for (let i = 0; i < tweets.length; i++) {
                console.log(`${tweets[i].text} | ${tweets[i]["created_at"]}`);
            }
        })
    },
    movie : function(search) {
        request.get(`http://www.omdbapi.com/?apikey=trilogy&r=json&t=${search}`,
            (err, res, bodyString) => {
                if (err) throw err;
                let body = JSON.parse(bodyString);
                let movie = {
                    title: body.Title,
                    plot: body.Plot,
                    cast: body.Actors,
                    year: body.Year,
                    imdb: body.Ratings[0].Value,
                    rotten: body.Ratings[1].Value,
                    country: body.Country,
                    language: body.Language,
                }
                console.log(movie);
            }
        );
    },
    random : function() {

    },
}