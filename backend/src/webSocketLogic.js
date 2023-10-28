const socketIO = require('socket.io');

module.exports = (server) =>
{
    const io = socketIO(server);

    io.on('connection', (socket) =>
    {
        console.log('A user connected');

        // Handle WebSocket events (e.g., update stations)
        socket.on('updateStation', (data) =>
        {
            console.log("inside socket");
            console.log(data);
            // Handle the update and database interaction
            // ...

            // Broadcast the updated data to all connected clients
            io.emit('stationUpdated', data);
        });
    });
};
