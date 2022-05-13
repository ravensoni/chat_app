// Node server which will handle socket.io connections.

// const io = require('socket.io')(8000)

const io = require('socket.io')(8000, {
	cors: {
		origin: '*'
	}
})

// io.origins('*:*')
// io.set('origins', '*:*');
// io.set('origins', 'http://localhost:8000');
/**
 * 
 * import express from 'express';
	import { Server } from 'socket.io';
	const app = express();
	const server = app.listen(3000);
	const io = new Server(server, { cors: { origin: '*' } });
 */

const users = {}

io.on('connection', socket => {
	socket.on('new-user-joined', name => {
		users[socket.id] = name;
		socket.broadcast.emit('user-joined', name)
		console.log(users);
	})

	socket.on('send', message => {
		socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
	})

	socket.on('disconnect', message => {
		socket.broadcast.emit('left', users[socket.id])
		delete users[socket.id]
	})
})