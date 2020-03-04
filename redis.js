var redis = require("redis");
module.exports = function(app){
    client = redis.createClient();

    client.on("error", function (err) {
        console.log("Error " + err);
    });

    return client
}