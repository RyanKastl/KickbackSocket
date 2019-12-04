# KickbackSocket
A simple helper server for the kickback project

# Install
- Clone this Repo
- Run `Yarn`
- Run `node index`

# Client Connections
- First instantiate the socket: 
    - `var socket = io(<server-ip>);`
- Immediately connect to the session:
    - `socket.emit('join', <session_id>);`
- Set up a listener:
    - `socket.on('update', function(msg) { <Handling> });`
    - `msg` will either be `"queue"` or `"chat"` which specifies whether the queue or the chat should be updated on the client.
- When leaving a session:
    - `socket.emit('leave', <session_id>);`
