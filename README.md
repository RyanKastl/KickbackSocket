# KickbackSocket
A simple helper server for the kickback project

# Install
- Clone this Repo
- Run `Yarn`
- Run `node index`

# Client Connections
- First instantiate the socket: 
    - `var socket = io(<server-ip>);`

- Immediately connect to the session and register your username:
    - `socket.emit('join', <session_id>);`
    - `socket.emit('join', <username>);`

- Set up a listener:
    - `socket.on('update', function(msg) { <Handling> });`
    - `msg` will either be `"queue"` or `"chat"` which specifies whether the queue or the chat should be updated on the client.
- When leaving a session:
    - `socket.emit('leave', <session_id>);`

- When logging out (if not disconnecting):
    - `socket.emit('leave', <username>);`

# Endpoint API
- `/updateQueue`
    - Parameters:
        - `sessionid : string`
    - Returns:
        - `Status: 200`
    - Description:
        - Calling this endpoint will tell the socket server to tell everyone in `sessionid` to update their queue.

- `/updateChat`
    - Parameters:
        - `sessionid : string`
    - Returns:
        - `Status: 200`
    - Description:
        - Calling this endpoint will tell the socket server to tell everyone in `sessionid` to update their chat.

- `/updateFollowers`
    - Parameters:
        - `usernames : Array<string>`
    - Returns:
        - `Status: 200`
    - Description:
        - Calling this endpoint will tell the socket server to tell everyone in `usernames` to update their followers list.