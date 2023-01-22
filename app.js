import express from "express";
import * as http from "http";
import { Server } from "socket.io";
import bodyParser from "body-parser";


const app = express()
const port = 8080
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.use(express.static('src'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.redirect(__dirname + '/login.html');
})

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/login.html');
})

app.post('/login', (req, res) => {
    if(req.body.username === "aaa" && req.body.password === "bbb") {
        res.redirect('index.html');
    } else {
        res.sendStatus(401)
    }
})

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

io.on("connection", (socket) => {
  socket.broadcast.emit("user-connected", "New user connected");
  socket.on('chat message', (msg) => {
    socket.broadcast.emit('chat message', msg)
  })
});


