//  DEPENDENCIES 
//  Installed Dependencies
const request = require("request");
const fs = require("fs");

//  NPM Dependencies
require("dotenv").config();

//  LOCAL MODULES
const keys = require("./keys");

//  API KEYS SETUP
const Twitter = require("twitter");
const Spotify = require("node-spotify-api");

const twitter = new Twitter(keys.twitter);
const spotify = new Spotify(keys.spotify)

//  PROCESS ARGUMENTS
const CLIObj = {
    cmd: process.argv[2],
    arg: process.argv[3],
}


const functions = {
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
        fs.readFile('random.txt', { encoding: "utf-8" }, (err, data) => {
            data = data.split(",");
            CmdObj = {
                cmd: data[0],
                arg: data[1],
            };
            liri(CmdObj);
        });
    },
}

function liri(Obj) {
    switch(Obj.cmd) {
        case "my-tweets":
            functions.twitter();
            break;
        case "spotify-this":
            functions.spotify(Obj.arg);
            break;
        case "movie-this":
            functions.movie(Obj.arg);
            break;
        case "do-what-it-says":
            functions.random();
            break;
    }
} 

liri(CLIObj);