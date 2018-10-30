const LCUConnector = require('lcu-connector');
const request = require('request');

var lcu = new LCUConnector();

function run(callback) {
    lcu.on('connect', (data) => {
        if (data == null) {
            callback(null);
            return;
        }
        console.log(data.password);
        callback(data);
    });
    lcu.start();
}
header = window.btoa(`${data.username}:${data.password}`);

function getJSON(endpoint, callback)
{
    uri = encodeURI(endpoint);
    request.get(uri, {
        headers: {
            "Authorization": `Basic ${this.token}`
        },
        "rejectUnauthorized": false
    }, (err, res, data) => {
        callback(data);
    });
}