const io = require('socket.io')
const dialog = require('../controller/dialogflow')


function initConnection(http) {
    
    var connect = io(http)

    function done(result, err, id){
        console.log('result received')
        connect.emit('chat message', result) 
    };

    connect.on('connection', function(socket){
        // incoming message
        socket.on('chat message', function(msg){
            dialog.runSample(msg, socket.id, done)
            console.log('message: ' + msg);
          });

        socket.on('disconnect', function(){
            console.log('user disconnected');
          });
    })
}

module.exports = {
    initConnection
}