//  DEPENDENCIES 
//  Installed Dependencies
const request = require("request");
const fs = require("fs");

//  NPM Dependencies
require("dotenv").config();

//  LOCAL MODULES
const functions = require("./functions");

//  PROCESS ARGUMENTS
const CLIObj = {
    cmd: process.argv[2],
    arg: process.argv[3],
}

switch(CLIObj.cmd) {
    case "my-tweets":
        functions.twitter();
        break;
    case "spotify-this":
        functions.spotify(CLIObj.arg);
        break;
    case "movie-this":
        functions.movie(CLIObj.arg);
        break;
    case "do-what-it-says":
        functions.random();
        break;
}